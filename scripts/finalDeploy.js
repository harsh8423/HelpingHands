const hre = require("hardhat");

async function main() {
  const info = await hre.ethers.getContractFactory("info");
  const contract = await info.deploy(); //instance of contract

  await contract.deployed();
  console.log("Address of contract:", contract.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});