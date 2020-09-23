import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import PollABI from '../contracts/poll.json'
import { account } from '../constants'

function Poll() {
  const [question, setQuestion] = useState('')
  const [option0, setOption0] = useState('')
  const [option1, setOption1] = useState('')
  // set web3 provider
  const web3 = new Web3(new
    Web3.providers
      .HttpProvider("http://localhost:8545"));
  const address = '0x088F2faf9169d98641Ec0DD1349E7D38Ff719dCb'
  const contract = new web3.eth.Contract(PollABI, address);
  contract.setProvider(web3.currentProvider);
  // get polls id
  useEffect(() => {
    let PollsId = [];
    contract.methods.getPollsId().call().then((data) => {
      PollsId = data;
      PollsId.map(id => {
        contract.methods.getPollById(id).call().then(console.log)
      })
    })
  }, [])

  const createNewPoll = e => {
    e.preventDefault()
    const options = [option0, option1]
    contract.methods.createNewPoll(question, options).send({ from: account, gas: 3000000 }).then((res) => {
      const { id, question } = res.events.CreationSuccess.returnValues
      console.log(id, question)
    })
  }

  return (
    <div className="Poll">
      <hr></hr>
      <h1>Poll</h1>
      <form onSubmit={createNewPoll}>
        <label>question: </label>
        <input value={question} onChange={e => setQuestion(e.target.value)}></input>
        <br />
        <label>options:</label>
        <input value={option0} onChange={e => setOption0(e.target.value)} />
        <br />
        <input value={option1} onChange={e => setOption1(e.target.value)} />
        <br />
        <button onClick={createNewPoll}>Send A New Poll</button>
      </form>
    </div>
  );
}

export default Poll;