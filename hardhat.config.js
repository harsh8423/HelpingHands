
// require("@nomicfoundation/hardhat-toolbox");
 
// Import required Hardhat module
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // Specify the Solidity compiler version
  solidity: "0.8.17",

  // Define network configurations
  networks: {
    // Hardhat network configuration
    hardhat: {
      chainId: 31337, // Chain ID for the Hardhat network
    },
  },

  // Define paths for artifacts (compiled contract files)
  paths: {
    artifacts: "./frontend/src/artifacts", // Path to store compiled contract artifacts
  },
};
