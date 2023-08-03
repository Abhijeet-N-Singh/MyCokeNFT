require("dotenv").config();
const API_URL = process.env.API_URL;

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MyCokeNFT.sol/MyCokeNFT.json");

console.log(JSON.stringify(contract.abi));

const contractAddress = "60de62784bd499e383ea1dae9f57fbbc10729bd0f70245874a630be5805ebdc4";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
//create transaction
async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}
mintNFT(
    "https://gateway.pinata.cloud/ipfs/QmZ9uBZwLuV3uZhmLDqX8o8JcPZFGUWuG7M5QqVy6LDd9j?_gl=1*u2mndh*_ga*MjYzMDM3OTM3LjE2OTA5OTA0MDA.*_ga_5RMPXG14TE*MTY5MDk5MDQwMC4xLjEuMTY5MDk5MTk0MC42MC4wLjA."
);