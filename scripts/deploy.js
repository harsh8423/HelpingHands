const hre = require("hardhat");

// Function to get balances of Ethereum addresses
async function getBalances(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

// Function to log balances of multiple addresses
async function cosoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance:`, await getBalances(address));
    counter++;
  }
}

// Function to log memos
async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;
    console.log(
      `At ${timestamp}, name ${name}, address ${from}, message ${message}`
    );
  }
}

// Main function
async function main() {
  // Get Ethereum signers
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();

  // Deploy the contract
  const info = await hre.ethers.getContractFactory("info");
  const contract = await info.deploy(); // Instance of the contract
  await contract.deployed();
  console.log("Address of contract:", contract.address);

  // Ethereum addresses
  const addresses = [
    owner.address,
    from1.address,
    from2.address,
    from3.address,
  ];

  console.log("Before buying chai");
  await cosoleBalances(addresses);

  // Transaction amount
  const amount = { value: hre.ethers.utils.parseEther("1") };

  // Debit transactions
  await contract.connect(from1).debit("from1", "Very nice chai", amount);
  await contract.connect(from2).debit("from2", "Very nice course", amount);
  await contract.connect(from3).debit("from3", "Very nice information", amount);

  console.log("After buying chai");
  await cosoleBalances(addresses);

  // Get memos and log them
  const memos = await contract.getMemos();
  consoleMemos(memos);
}

// Execute the main function and handle errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
