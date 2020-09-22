import React, { useState } from 'react';
import Web3 from 'web3';
import SimpleStorageABI from '../contracts/simpleStorage.json'

function SimpleStorage() {
  const [inputValue, setInputValue] = useState('')
  const web3 = new Web3(new
    Web3.providers
      .HttpProvider("http://localhost:8545"));

  // truffle migrate
  // contract address:
  const address = '0xcCB0e28D65a326C7EFf3A4992D049E4A2d9C1864'
  const contract = new web3.eth.Contract(SimpleStorageABI, address);
  contract.setProvider(web3.currentProvider)

  // ganache-cli
  // Available Accounts[0]:
  const account = '0x42307D29D1bb4d74c2069E254C6f3534c541896A'

  const getValue = () => {
    contract.methods.get().call().then(console.log)
  }

  const add = () => {
    contract.methods.set(inputValue).send({ from: account }).then(() => {
      getValue()
    })
  }

  const captureInputValue = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <div className="App">
      <input type="text" onChange={(e) => captureInputValue(e)} />
      <a onClick={add}>Click me!</a>
    </div>
  );
}

export default SimpleStorage;