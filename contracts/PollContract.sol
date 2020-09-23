pragma experimental ABIEncoderV2;

contract PollContract {

  struct Poll{
    bytes32 id;
    bytes32 hash;
    Sender sender;
    string question;
    string[] options;
    uint[] results;
  }

  struct Sender{
    string name;
    string id;
    address addr;
  }

  event CreationSuccess(
        bytes32 id,
        string question
    );

  mapping(bytes32 => Poll) poll_by_id;
  bytes32[] PollsId;

  function createNewPoll(string memory _question, string[] memory _options) public{
    bytes32 _id = keccak256(abi.encodePacked(_question));
    Poll storage poll = poll_by_id[_id];
    PollsId.push(_id);
    poll.id = _id;
    poll.question = _question;
    poll.options = _options;
    poll.results = new uint[](_options.length);
    
    emit CreationSuccess(poll.id, poll.question);
  }

  function getPollById(bytes32 _id) public view returns (string memory question, string[] memory _options, uint[] memory results) {
    Poll storage poll = poll_by_id[_id];
    return (poll.question, poll.options, poll.results);
  }

  function getPollsId() public view returns(bytes32[] memory){
    return PollsId;
  }

}