// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
async function main() {
  const MyCokeNFT = await ethers.getContractFactory("MyCokeNFT");

  // Start deployment, returning a promise that resolves to a contract object
  const myCokeNFT = await MyCokeNFT.deploy();
  console.log("Contract deployed to address:", myCokeNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
