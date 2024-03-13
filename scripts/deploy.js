// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const fundraiser = await hre.ethers.deployContract("Fundraiser", [
    "coupon",
    "https://x.com/ryosk7",
    "transback coupons",
    "0x820EfA1E11D5d5145Efc6706c375733dEcFC2ca8", // beneficiary
    deployer.getAddress(), // custodian
  ]);

  await fundraiser.waitForDeployment();

  console.log("fundraiser address:", await fundraiser.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
