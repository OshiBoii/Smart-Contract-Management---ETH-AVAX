// Import Hardhat Runtime Environment explicitly
const hre = require("hardhat");

async function main() {
  const Assessment = await hre.ethers.getContractFactory("Assessment"); // Get contract factory
  const assessment = await Assessment.deploy(); // Deploy contract without passing an initial balance
  await assessment.deployed(); // Wait for contract to be deployed

  console.log(`A contract deployed to ${assessment.address}`); // Log the contract address
}

// Execute the main function and catch errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1; // Exit with an error code
});
