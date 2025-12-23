// import "dotenv/config";
// import "@nomicfoundation/hardhat-ethers";

// const { API_URL, PRIVATE_KEY } = process.env;
import "@nomicfoundation/hardhat-viem";

export default {
  solidity: "0.8.11",
  networks: {
    hardhat: {
      type: "edr-simulated",
    },
  },
};
