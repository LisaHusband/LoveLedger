import os
import json
from flask import Flask, request, jsonify
from web3 import Web3
from dotenv import load_dotenv
from extract_abi import extract_abi
from flask_cors import CORS

load_dotenv()
# 首次启动抽取 ABI
extract_abi()

app = Flask(__name__)
CORS(app)

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

def send_transaction(fn_call):
    """统一构建、签名并发送交易，返回 tx_hash"""
    nonce = web3.eth.get_transaction_count(ACCOUNT_ADDRESS)
    tx = fn_call.build_transaction({
        "from": ACCOUNT_ADDRESS,
        "nonce": nonce,
        "gas": 300_000,
        "max_fee_per_gas": web3.to_wei(10, "gwei"),
        "max_priority_fee_per_gas": web3.to_wei(2, "gwei"),
    })
    signed = web3.eth.account.sign_transaction(tx, PRIVATE_KEY)
    # v6 以上属性名改为 raw_tx
    raw_tx = signed.raw_tx
    tx_hash = web3.eth.send_raw_transaction(raw_tx)
    return web3.to_hex(tx_hash)

# @app.route("/confess", methods=["POST"])
# def confess():
#     data = request.get_json(force=True)
#     to_addr = data.get("to")
#     title = data.get("title")
#     message = data.get("message")
#     if not all([to_addr, title, message]):
#         return jsonify({"error": "缺少必填字段"}), 400

#     try:
#         to_addr = Web3.to_checksum_address(to_addr)
#         fn = contract.functions.confess(to_addr, title, message)
#         tx_hash = send_transaction(fn)
#         return jsonify({"tx_hash": tx_hash}), 201
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

@app.route("/register_marriage", methods=["POST"])
def register_marriage():
    data = request.get_json(force=True)
    partner = data.get("partner")
    if not partner:
        return jsonify({"error": "缺少 partner 字段"}), 400

    try:
        partner = Web3.to_checksum_address(partner)
        fn = contract.functions.registerMarriage(partner)
        tx_hash = send_transaction(fn)
        return jsonify({"tx_hash": tx_hash}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/loyalty_interaction", methods=["POST"])
def loyalty_interaction():
    data = request.get_json(force=True)
    partner = data.get("partner")
    if not partner:
        return jsonify({"error": "缺少 partner 字段"}), 400

    try:
        partner = Web3.to_checksum_address(partner)
        fn = contract.functions.loyaltyInteraction(partner)
        tx_hash = send_transaction(fn)
        return jsonify({"tx_hash": tx_hash}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/confessions", methods=["GET"])
def get_confessions():
    try:
        records = contract.functions.getAllConfessions().call()
        result = [
            {
                "title": rec[0],
                "message": rec[1],
                "sender": rec[2],
                "receiver": rec[3],
                "timestamp": rec[4],
            }
            for rec in records
        ]
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/verify_identity", methods=["GET"])
def verify_identity():
    return jsonify({"address": ACCOUNT_ADDRESS}), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)
