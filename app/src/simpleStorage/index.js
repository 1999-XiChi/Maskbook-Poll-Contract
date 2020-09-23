import React, { useState } from 'react';
import Web3 from 'web3';
import SimpleStorageABI from '../contracts/simpleStorage.json'
import { account } from '../constants'

function SimpleStorage() {
  const [inputValue, setInputValue] = useState('')
  const web3 = new Web3(new
    Web3.providers
      .HttpProvider("http://localhost:8545"));

  // truffle migrate
  // contract address:
  const address = '0xCFD8C35F967AB91F1D72ea4C0cA229de36E430D1'
  const contract = new web3.eth.Contract(SimpleStorageABI, address);
  contract.setProvider(web3.currentProvider)

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
      <button onClick={add}>Click me!</button>
    </div>
  );
}

export default SimpleStorage;