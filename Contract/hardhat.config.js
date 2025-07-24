require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
        sepolia: {
            url: process.env.ALCHEMY_API_URL,
            accounts: [process.env.PRIVATE_KEY],
            gasPrice: 20000000000,  // 设置合适的 Gas 费用 (例如 20 gwei)
            gas: 2000000  // 设置 Gas 限制
        }
    }
};
