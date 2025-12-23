// import hre from "hardhat";

// async function main() {
//   const [deployer] = await hre.ethers.getSigners();

//   console.log("Deploying contracts with account:", deployer.address);

//   const Voting = await hre.ethers.getContractFactory("DecentralizedVoting");
//   const voting = await Voting.deploy(["Mark", "Mike", "Henry", "Rock"], 10); // 10 minutes

//   await voting.deployed();
//   console.log("Contract deployed at:", voting.address);
// }

// main().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });




import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy(["Mark", "Mike", "Henry", "Rock"], 10); // 10 minutes

  await voting.deployed();
  console.log("Voting contract deployed at:", voting.address);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
