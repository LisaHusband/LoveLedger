import os
import requests
from dotenv import load_dotenv

# 从 .env 文件加载环境变量
load_dotenv()

# 获取环境变量
FROM_ADDRESS = os.getenv("FROM_ADDRESS")
TO_ADDRESS = os.getenv("TO_ADDRESS")
FROM_PRIVATE_KEY = os.getenv("FROM_PRIVATE_KEY")
TO_PRIVATE_KEY = os.getenv("TO_PRIVATE_KEY")
BACKEND_HOST = os.getenv("BACKEND_HOST")
BACKEND_URL = os.getenv("BACKEND_URL", f"http://{BACKEND_HOST}:5000")

confession_id = None
marriage_id = None

# 设置 headers
HEADERS = {"Content-Type": "application/json"}

# 发起表白测试
def test_confess():
    data = {
        "from": FROM_ADDRESS,
        "private_key": FROM_PRIVATE_KEY,
        "to": TO_ADDRESS,
        "title": "Love Confession",
        "message": "I have fallen for you!"
    }
    response = requests.post(f"{BACKEND_URL}/confess", json=data, headers=HEADERS)
    print("Confess Response:", response.json())
    global confession_id
    confession_id = response.json().get("confession_id")
    assert confession_id is not None

# 回应表白测试
def test_respond_confession():
    if confession_id is None:
        print("No confession to respond to. Skipping...")
        return
    accept = True  # 假设接受表白
    data = {
        "from": TO_ADDRESS,
        "private_key": TO_PRIVATE_KEY,
        "confession_id": confession_id,
        "accept": accept
    }
    response = requests.post(f"{BACKEND_URL}/respond_confession", json=data, headers=HEADERS)
    print("Respond Confession Response:", response.json())
    assert response.json().get("status") == "success"

# 婚姻登记测试
def test_register_marriage():
    data = {
        "from": FROM_ADDRESS,
        "private_key": FROM_PRIVATE_KEY,
        "partner": TO_ADDRESS
    }
    response = requests.post(f"{BACKEND_URL}/register_marriage", json=data, headers=HEADERS)
    print("Register Marriage Response:", response.json())
    global marriage_id
    marriage_id = response.json().get("marriage_id")
    assert marriage_id is not None

# 回应婚姻测试
def test_respond_marriage():
    if marriage_id is None:
        print("No marriage to respond to. Skipping...")
        return
    accept = True  # 假设接受婚姻
    data = {
        "from": TO_ADDRESS,
        "private_key": TO_PRIVATE_KEY,
        "marriage_id": marriage_id,
        "accept": accept
    }
    response = requests.post(f"{BACKEND_URL}/respond_marriage", json=data, headers=HEADERS)
    print("Respond Marriage Response:", response.json())
    assert response.json().get("status") == "success"

# 查询某地址收到的表白
def test_get_confessions_to():
    response = requests.get(f"{BACKEND_URL}/confessions_to/{TO_ADDRESS}", headers=HEADERS)
    print("Get Confessions To Response:", response.json())
    assert len(response.json()) > 0

# 查询某地址的婚姻记录
def test_get_marriages_of():
    response = requests.get(f"{BACKEND_URL}/marriages_of/{TO_ADDRESS}", headers=HEADERS)
    print("Get Marriages Of Response:", response.json())
    assert len(response.json()) > 0

# 获取某地址的爱情信用
def test_get_love_credit():
    response = requests.get(f"{BACKEND_URL}/love_credit/{TO_ADDRESS}", headers=HEADERS)
    print("Get Love Credit Response:", response.json())
    assert response.json().get("love_credit") >= 0

# 验证身份
def test_verify_identity():
    response = requests.get(f"{BACKEND_URL}/verify_identity", headers=HEADERS)
    print("Verify Identity Response:", response.json())
    assert response.json().get("address") == FROM_ADDRESS

if __name__ == "__main__":
    # 运行所有测试
    test_confess()
    test_respond_confession()
    test_register_marriage()
    test_respond_marriage()
    test_get_confessions_to()
    test_get_marriages_of()
    test_get_love_credit()
    test_verify_identity()
