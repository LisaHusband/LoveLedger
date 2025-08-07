# LoveLedger — The Immutable Love Ledger on Blockchain
<img src="https://loveledger.tech/static/media/logo.87f3ae55211ae7314171.gif" width="200" height="200" />

# DECLARATION:  **It is aimed at those who are full of high-sounding promises or deceive people under some high-sounding banners.**
🔁 **[简体中文](README_CN.md)**

> **LoveLedger** — The Immutable Love Ledger on Blockchain
> Permanently recording love promises, confessions, proposals, and marriage information on the blockchain, safeguarding the credit of true love.

---

## Project Overview

LoveLedger is a romantic application based on blockchain technology designed to provide truly loving couples with an immutable and transparent platform to record their love commitments.
Every confession, proposal, or marriage information is recorded on-chain to ensure authenticity and permanence. Through on-chain blessings and interactions, LoveLedger also helps couples enhance their loyalty and build a unique love credit system.

---

## Core Features (Currently only supports the deployer to express love to others)

* 💌 **On-chain Confessions & Proposals** — Record your love vows that never fade.
* 🎉 **On-chain Blessings** — Receive blessings and support from users worldwide.(planning)
* 💍 **Marriage Registration** — Witness the permanent commitment of love.
* 📊 **Loyalty Score** — Build a couple’s credit rating through interactions and on-chain behavior.(planning)
* 🔍 **Public Records Query** — Transparent and publicly accessible love records browsing and search.
* 🔐 **Decentralized Identity** — Secure identity verification based on wallet addresses.

---

## Environment Setup

### Environment Requirements

* **Node.js Version: 18.18.2**
* **Python Version: 3.12.0**

### Dependency Installation

* **Frontend Dependencies** — Navigate to the `loveledger-frontend` folder and run `npm install` to install frontend dependencies.
* **Backend Dependencies** — Navigate to the `loveledger-backend` folder and run `pip install -r requirements.txt` to install backend dependencies (a virtual environment is optional).
* **Smart Contract Dependencies** — Navigate to the `Contract` folder and run `npm install` to install contract dependencies.

### Environment Configuration Files

* **Frontend .env Configuration** — No configuration required.
* **Backend .env Configuration** — Run `cp loveledger-backend/.env.example loveledger-backend/.env`, then fill in your wallet address, private key, contract deployment address (**printed to console after contract deployment**), and API information.
* **Contract .env Configuration** — Run `cp Contract/.env.example Contract/.env`, then fill in your private key and API information.

---

## Run Instructions

* **Deploy Smart Contract** — Navigate to the `Contract` folder and run `npx hardhat run scripts/deploy.js --network sepolia` to deploy the contract on the Sepolia network.
* **Start Frontend** — Navigate to the `loveledger-frontend` folder and run `npm start` to launch the frontend application.
* **Start Backend** — Navigate to the `loveledger-backend` folder and run `python app.py` to start the backend service.

---

## Contribution Guide

Contributions, ideas, and suggestions from the open-source community are welcome!
Please read [CONTRIBUTING.md](doc/CONTRIBUTING.md) for contribution guidelines.

---

## Contact
* Community: [Discord links](https://discord.gg/wnxj7Nea)



---

## License

All rights reserved © 2025 LoveLedger Project Team
