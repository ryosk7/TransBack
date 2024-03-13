require("@nomicfoundation/hardhat-toolbox");

const INFURA_API_KEY = "__YOUR_INFURA_API_KEY__";
const PRIVATE_KEY = "__YOUR_METAMASK_PRIVATE_KEY__";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.6.5",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`${PRIVATE_KEY}`],
    },
  },
};
