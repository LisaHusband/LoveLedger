# LoveLedger — 区块链上的“爱情账本”
### **版本：1.0.0**


# 声明：**此项目针对的就是那些满嘴冠冕堂皇的承诺或者打着一些冠冕堂皇的旗号欺骗感情的人**

🔁 **[English Version](README.md)**

> **LoveLedger** — 区块链上的“爱情账本”
> 将爱的誓言、表白、求婚和婚姻信息永久记录于链上，守护真爱的信用。



---

## 项目简介

LoveLedger 是一个基于区块链技术的浪漫应用，旨在为真正相爱的情侣提供一个**不可篡改、公开透明**的平台，用于记录彼此的承诺。
每一条表白、每一次求婚、每段婚姻注册都将被记录在链上，确保其**真实性与永久性**。
通过链上的祝福与交互，LoveLedger 还将帮助情侣构建独一无二的“爱情信用体系”。

---

## 核心功能（当前仅支持Sepolia测试网）

* 💌 **链上表白与求婚** — 记录你那永不褪色的爱之誓言。
* 🎉 **链上祝福系统** — 来自全球用户的支持与祝福。(规划中)
* 💍 **婚姻上链登记** — 见证爱情的永久承诺。
* 📊 **情侣忠诚度评分** — 通过交互与链上行为构建情侣信用。
* 🔍 **公开记录查询** — 所有爱情记录均可公开透明地检索。
* 🔐 **去中心化身份系统** — 基于钱包地址的安全身份验证。

---
## 环境搭建


### 环境依赖
* **Node.js-Version 18.18.2**
* **Python-Version 3.12.0**

### 依赖安装

* **前端依赖安装** — cd到loveledger-frontend文件夹，运行`npm install`安装前端依赖。
* **后端依赖安装** — cd到loveledger-backend文件夹，运行`pip install -r requirements.txt`安装后端依赖(可选虚拟环境)。
* **合约依赖安装** — cd到Contract文件夹，运行`npm install`安装合约依赖。

### 环境配置文件

* **前端.env配置** — 无需配置。
* **后端.env配置** — `cp loveledger-backend/.env.example loveledger-backend/.env` 然后填充自己的账户地址，私钥，合约部署地址（**部署合约**后会输出到控制台）以及API信息。
* **合约.env配置** — `cp Contract/.env.example Contract/.env` 然后填充自己的私钥以及API信息。



## 运行流程

* **部署合约** — cd到Contract文件夹，运行`npx hardhat run scripts/deploy.js --network sepolia` 在 Sepolia 网络上部署合约。
* **部署前端** — cd到loveledger-frontend文件夹，运行`npm start` 启动前端应用。
* **部署后端** — cd到loveledger-backend文件夹，运行`python app.py` 启动后端应用。

---

## 贡献指南

我们欢迎来自开源社区的贡献、建议与想法！
请在提交前阅读完整的贡献指南：[CONTRIBUTING.md](doc/CONTRIBUTING.md)

⚠️ **注意**：LoveLedger 项目保留所有版权，仅开放源代码以推动技术与爱的融合，**禁止任何形式的商业用途**，除非获得官方团队的书面授权。

---

## 联系方式

* 社区链接：[加入我们的 Discord](https://discord.gg/wnxj7Nea)

---

## 许可协议

```
版权所有 © 2025 LoveLedger 项目组

本项目已开放源代码，但保留所有商业权利。任何用于商业目的的复制、修改、分发，需事先取得项目组的书面许可。

禁止将本项目用于代币发行、链上金融产品、区块链博彩或其他任何商业变现目的。

更多详情请参见 LICENSE 文件。
```

