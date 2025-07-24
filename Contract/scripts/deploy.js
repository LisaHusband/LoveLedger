require("dotenv").config();
const hre = require("hardhat");

async function main() {
    const LoveChain = await hre.ethers.getContractFactory("LoveChain");
    const loveChain = await LoveChain.deploy();
    await loveChain.deployed();
    console.log("LoveChain deployed to:", loveChain.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
