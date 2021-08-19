const Web3 = require("web3")

const web3 = new Web3(new Web3.providers.HttpProvider(`https://eth-mainnet.alchemyapi.io/v2/${process.env.API_KEY}`))

export default web3;