import os
import sys
import json
from flask import Flask, request, jsonify
from web3 import Web3
from dotenv import load_dotenv
from extract_abi import extract_abi
from flask_cors import CORS
import logging
from logging.handlers import RotatingFileHandler
from flask import g


load_dotenv()
# 首次启动抽取 ABI
extract_abi()

app = Flask(__name__)
# 跨域
CORS(app)



# 初始化日志系统
ENABLE_LOGGING = os.getenv("ENABLE_LOGGING", "false").lower() == "true"
LOG_PATH = os.path.join("log", "server.log")

if ENABLE_LOGGING:
    if not os.path.exists("log"):
        os.makedirs("log")
    handler = RotatingFileHandler(LOG_PATH, maxBytes=5*1024*1024, backupCount=3)
    formatter = logging.Formatter("[%(asctime)s] %(levelname)s in %(module)s: %(message)s")
    handler.setFormatter(formatter)
    handler.setLevel(logging.INFO)
    app.logger.addHandler(handler)
    app.logger.setLevel(logging.INFO)
    app.logger.info("Logging enabled.")
else:
    app.logger.setLevel(logging.CRITICAL)

# 环境变量
ALCHEMY_API_URL = os.getenv("ALCHEMY_API_URL")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
ACCOUNT_ADDRESS = os.getenv("ACCOUNT_ADDRESS")
CONTRACT_ADDRESS = Web3.to_checksum_address(os.getenv("CONTRACT_ADDRESS"))


# 连接节点
web3 = Web3(Web3.HTTPProvider(ALCHEMY_API_URL))
if not web3.is_connected:
    raise RuntimeError("无法连接到以太坊节点")

# 载入 ABI
with open(os.path.join("loveledger-backend", "LoveChain_ABI.json"), "r") as f:
    contract_abi = json.load(f)
contract = web3.eth.contract(address=CONTRACT_ADDRESS, abi=contract_abi)
# 解码事件数据
COFFESSION_EVENT = contract.events.ConfessionSent()
MARRIAGE_EVENT = contract.events.MarriageProposed()

def send_transaction(fn_call, from_address, private_key):
    """Builds, signs, and sends a transaction.

    Args:
        fn_call: The function call object to build the transaction.
        from_address: The sender's Ethereum address.
        private_key: The sender's private key for signing the transaction.

    Returns:
        A tuple containing the transaction hash (as a hex string) and the transaction receipt.
    """
    # Get the transaction count for the sender's address to use as the nonce
    nonce = web3.eth.get_transaction_count(from_address)

    # Build the transaction with specified gas and fee parameters
    tx = fn_call.build_transaction({
        "from": from_address,
        "nonce": nonce,
        "gas": 300_000,
        "maxFeePerGas": web3.to_wei(10, "gwei"),
        "maxPriorityFeePerGas": web3.to_wei(2, "gwei"),
    })

    # Sign the transaction with the sender's private key
    signed = web3.eth.account.sign_transaction(tx, private_key)

    # Send the signed transaction to the network
    tx_hash = web3.eth.send_raw_transaction(signed.raw_transaction)

    # Wait for the transaction to be confirmed and get the receipt
    tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)

    # Log the transaction receipt for debugging purposes
    app.logger.info(f"Transaction receipt: {tx_receipt}")

    # Return the transaction hash and receipt
    return web3.to_hex(tx_hash), tx_receipt


@app.before_request
def log_request_info():
    """
    Logs the request body and other information before the request is handled.

    This is a Flask before_request handler that logs the request body and other
    information about the request, only if ENABLE_LOGGING is True.

    Notes:
        * The request body is logged as a string, regardless of the content type.
        * The request body is stored in the g object as g.request_data.
        * The log message is at the INFO level.
    """
    if ENABLE_LOGGING:
        g.request_data = request.get_data(as_text=True)
        app.logger.info(f"Request: {request.method} {request.path} | Body: {g.request_data}")

@app.after_request
def log_response_info(response):
    """
    Logs the response information after the request is handled.

    This is a Flask after_request handler that logs the HTTP method, request path,
    and response status code, only if ENABLE_LOGGING is True.

    Args:
        response: The Flask response object to be logged.

    Returns:
        The original response object, unmodified.

    Notes:
        * The log message is at the INFO level.
    """

    if ENABLE_LOGGING:
        app.logger.info(f"Response: {request.method} {request.path} | Status: {response.status_code}")
    return response

# 表白接口
@app.route("/confess", methods=["POST"])
def confess():
    """
    Posts a confession to another user's address.

    The request body must contain the following fields:

    - from: The sender's Ethereum address.
    - private_key: The sender's Ethereum private key for signing the transaction.
    - to: The recipient's Ethereum address.
    - title: The title of the confession.
    - message: The message of the confession.

    Returns a JSON object containing the transaction hash and the confession ID.

    If any of the required fields are missing, returns a 400 error with a JSON object
    containing an "error" field set to "缺少必要字段".

    If an error occurs while sending the transaction, returns a 500 error with a JSON
    object containing an "error" field set to the error message.
    """
    data = request.get_json(force=True)
    from_address = data.get("from")
    private_key = data.get("private_key")
    to_addr = data.get("to")
    title = data.get("title")
    message = data.get("message")

    if not all([from_address, private_key, to_addr, title, message]):
        return jsonify({"error": "缺少必要字段"}), 400

    try:
        from_address = Web3.to_checksum_address(from_address)
        to_addr = Web3.to_checksum_address(to_addr)

        # 调用 confess 函数并发送交易
        fn = contract.functions.confess(to_addr, title, message)

        # 发送交易并获取交易哈希和交易回执
        tx_hash, tx_receipt = send_transaction(fn, from_address, private_key)


        confession_id = COFFESSION_EVENT.process_receipt(tx_receipt)[0].get('args').get('confessionId')

        if confession_id is None:
            raise Exception("Confession ID not found in transaction receipt.")

        # 返回交易哈希和 confessionId
        return jsonify({
            "tx_hash": tx_hash,
            "confession_id": confession_id
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 回应表白接口
@app.route("/respond_confession", methods=["POST"])
def respond_confession():
    """
    接收者回应表白

    :param from: string, 回应者的 Ethereum 地址
    :param private_key: string, 回应者的 Ethereum 私钥
    :param confession_id: int, 表白的 ID
    :param accept: bool, 是否接受表白

    :return: JSON response with transaction hash, confession_id and accept status
    """
    data = request.get_json(force=True)
    from_address = data.get("from")
    private_key = data.get("private_key")
    confession_id = int(data.get("confession_id"))
    accept = data.get("accept")

    if not all([from_address, private_key]) or confession_id is None or accept is None:
        return jsonify({"error": "缺少必要字段"}), 400

    try:
        from_address = Web3.to_checksum_address(from_address)
        fn = contract.functions.respondConfession(confession_id, accept)
        tx_hash, tx_receipt = send_transaction(fn, from_address, private_key)
        return jsonify({"tx_hash": tx_hash, "confession_id": confession_id, "accept": accept, "status": "success"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 婚姻登记接口
@app.route("/register_marriage", methods=["POST"])
def register_marriage():
    """
    Registers a marriage proposal on the blockchain.

    The request body must contain the following fields:
    - from: The Ethereum address of the proposer.
    - private_key: The proposer's Ethereum private key for signing the transaction.
    - partner: The Ethereum address of the proposed partner.

    Returns:
        A JSON object containing the transaction hash and the marriage ID if the
        registration is successful.

    Raises:
        400 error: If any of the required fields are missing.
        500 error: If an error occurs while sending the transaction.
    """

    data = request.get_json(force=True)
    from_address = data.get("from")
    private_key = data.get("private_key")
    partner = data.get("partner")

    if not all([from_address, private_key, partner]):
        return jsonify({"error": "缺少必要字段"}), 400

    try:
        from_address = Web3.to_checksum_address(from_address)
        partner = Web3.to_checksum_address(partner)
        fn = contract.functions.registerMarriage(partner)
        tx_hash, tx_receipt = send_transaction(fn, from_address, private_key)
        marriage_id = MARRIAGE_EVENT.process_receipt(tx_receipt)[0].get('args').get('marriageId')
        return jsonify({"tx_hash": tx_hash, "marriage_id": marriage_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 回应婚姻接口
@app.route("/respond_marriage", methods=["POST"])
def respond_marriage():
    """
    Responds to a marriage proposal on the blockchain.

    The request body must contain the following fields:
    - from: The Ethereum address of the responder.
    - private_key: The responder's Ethereum private key for signing the transaction.
    - marriage_id: The ID of the marriage proposal to respond to.
    - accept: A boolean indicating whether the responder accepts or rejects the proposal.

    Returns:
        A JSON object containing the transaction hash, the marriage ID, the accept status
        and the status of the response if the response is successful.

    Raises:
        400 error: If any of the required fields are missing.
        500 error: If an error occurs while sending the transaction.
    """
    data = request.get_json(force=True)
    from_address = data.get("from")
    private_key = data.get("private_key")
    marriage_id = int(data.get("marriage_id"))
    accept = data.get("accept")

    if not all([from_address, private_key]) or marriage_id is None or accept is None:
        return jsonify({"error": "缺少必要字段"}), 400

    try:
        from_address = Web3.to_checksum_address(from_address)
        fn = contract.functions.respondMarriage(marriage_id, accept)
        tx_hash, tx_receipt = send_transaction(fn, from_address, private_key)
        return jsonify({"tx_hash": tx_hash, "marriage_id": marriage_id, "accept": accept, "status": "success"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 查询某地址收到的表白
@app.route("/confessions_to/<address>", methods=["GET"])
def get_confessions_to(address):
    """
    Queries the confessions that have been sent to a given address.

    The address should be a valid Ethereum address.

    Returns a JSON object containing the confessions, where each confession is an object
    with the following fields:

    - title: The title of the confession.
    - message: The message of the confession.
    - sender: The Ethereum address of the sender.
    - receiver: The Ethereum address of the receiver.
    - timestamp: The timestamp of the confession.
    - status: The status of the confession (Pending, Accepted or Rejected).

    Raises a 500 error if an error occurs while querying the contract.
    """
    try:
        address = Web3.to_checksum_address(address)
        confs = contract.functions.getConfessionsTo(address).call()
        result = [
            {
                "title": c[0],
                "message": c[1],
                "sender": c[2],
                "receiver": c[3],
                "timestamp": c[4],
                "status": c[5]
            }
            for c in confs
        ]
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 查询某地址的婚姻记录
@app.route("/marriages_of/<address>", methods=["GET"])
def get_marriages_of(address):
    """
    Queries the marriages involving a given address.

    The address should be a valid Ethereum address.

    Returns a JSON object containing the marriages, where each marriage is an object
    with the following fields:

    - partnerA: The Ethereum address of one partner.
    - partnerB: The Ethereum address of the other partner.
    - timestamp: The timestamp of the marriage registration.
    - status: The status of the marriage (Pending, Accepted, or Rejected).

    Raises a 500 error if an error occurs while querying the contract.
    """

    try:
        address = Web3.to_checksum_address(address)
        records = contract.functions.getMarriagesOf(address).call()
        result = [
            {
                "partnerA": r[0],
                "partnerB": r[1],
                "timestamp": r[2],
                "status": r[3]
            }
            for r in records
        ]
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 获取某地址的爱情信用
@app.route("/love_credit/<address>", methods=["GET"])
def get_love_credit(address):
    """
    Gets the love credit of a given address.

    The love credit is calculated as the absolute difference between the number of
    accepted confessions and the number of accepted marriages.

    Args:
        address: The Ethereum address to query.

    Returns a JSON object containing the love credit of the address.

    Raises a 500 error if an error occurs while querying the contract.
    """
    try:
        address = Web3.to_checksum_address(address)
        score = contract.functions.getLoveCredit(address).call()
        return jsonify({"love_credit": score}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 获取账户地址（验证身份）
@app.route("/verify_identity", methods=["GET"])
def verify_identity():
    """
    Gets the Ethereum address associated with the account.

    Returns a JSON object containing the address.

    Raises a 500 error if an error occurs while querying the contract.
    """
    return jsonify({"address": ACCOUNT_ADDRESS}), 200

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False, port=5000)
