const Web3 = require('web3')
// const Eth = require('web3-eth').Eth

// console.log(Web3.ginvenProvider)
// const eth = new Eth(Web3.ginvenProvider || 'ws://localhost:30303')

const options = {
  defaultAccount: '0x6f0796aFDf7B534C96D3a4FFc231aA5D42dfB7CA',
  defaultBlock: 'latest',
  defaultGas: 1,
  degaultGasPrice: 0,
  transactionBlockTimeout: 50,
  transactionConfirmationBlock: 24,
  transactionPollingTimeout: 480
}

/* const web3 = new Web3(new Web3.providers.HttpProvider(
  'https://ropsten.infura.io'
), options) */

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'), options)
// web3.eth.getBlockNumber(console.log)
// web3.eth.getBlock('0xfa7d4d764d0d3baaa7c6b0840951e273f82434d4af567652c5c60ecfff507862', true, console.log)
// web3.eth.getBalance('0x5DD4FE803E64f7dF6f5f4faE68441C41537A562f', (err, data) => console.log(data, 'balance'))
// web3.eth.getAccounts(console.log)
// let account = web3.eth.accounts.create('7524@home')
// console.log(account)

// 0x389Df69303dE18D61D8560F7A4890685b3eA5F06
// privateKey: '0xa3da3af1b78d994cead635f2213e02835a32f9ab9aa07f57ab9cb987d1cebe82'

// privateKey: '0xed2ed80aa5d30675905ff3fd5edfce0e64a939bdbc6388e704b09b2f036e83c2'
// 0xeb3C5cEcFA120684f7af22df4c34d6f2590236D5

let transaction = {
  from: '0x5DD4FE803E64f7dF6f5f4faE68441C41537A562f',
  to: '0x389Df69303dE18D61D8560F7A4890685b3eA5F06',
  value: '5000000000'
}

web3.eth.sendTransaction(transaction, console.log)
