import React, {useState} from 'react';
import Web3 from 'web3';
import PollABI from '../contracts/poll.json'

function Poll() {
  
  const web3 = new Web3(new
      Web3.providers
        .HttpProvider("http://localhost:8545"));
  /* const address = '0x5B8eDeF3643e254848ed11664e92391E8B9C2FCC'
  const contract = new web3.eth.Contract(PollABI, address);
  contract.setProvider(web3.currentProvider);
  console.log(contract)

  contract.methods.greet().call().then(console.log) */

  return (
    <div className="Poll">
      poll
    </div>
  );
}

export default Poll;