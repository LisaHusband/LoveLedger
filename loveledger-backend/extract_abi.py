import json
import os

def extract_abi():
    # 定义 LoveChain.json 的路径（合约编译后的文件）
    love_chain_json_path = r"Contract\artifacts\contracts\LoveChain.sol\LoveChain.json"
    
    # 确保路径存在
    if not os.path.exists(love_chain_json_path):
        raise FileNotFoundError(f"找不到合约编译文件: {love_chain_json_path}")

    # 读取 LoveChain.json 文件
    with open(love_chain_json_path, "r") as f:
        contract_data = json.load(f)

    # 提取 ABI
    abi = contract_data.get("abi")
    if not abi:
        raise ValueError("合约中没有 ABI 数据")

    # 保存 ABI 到 LoveChain_ABI.json
    abi_output_path = r"loveledger-backend\LoveChain_ABI.json"
    with open(abi_output_path, "w") as f:
        json.dump(abi, f, indent=2)

    print(f"ABI 已成功提取并保存到: {abi_output_path}")

