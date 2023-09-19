// Import Hardhat runtime environment
const hre = require("hardhat");

// Main function for deploying the contract
async function main() {
  // Get the contract factory for "info" (replace with your contract name)
  const info = await hre.ethers.getContractFactory("info");
  
  // Deploy the contract and get an instance of it
  const contract = await info.deploy();

  // Wait for the contract deployment to be confirmed
  await contract.deployed();

  // Log the address of the deployed contract
  console.log("Address of contract:", contract.address);
}

// Execute the main function and handle errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
