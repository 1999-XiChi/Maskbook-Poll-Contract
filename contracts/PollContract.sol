pragma experimental ABIEncoderV2;
import "github.com/Arachnid/solidity-stringutils/strings.sol" as it_mapping;

contract PollContract {
    struct Poll {
        bytes32 id;
        Sender sender;
        string question;
        string[] options;
        uint256[] results;
        uint create_time;
        PollHistory[] history;
        string[] voters_Key;
    }

    struct PollHistory {
        bytes32 poll_id;
        Sender sender;
        uint8 options_index;
        uint vote_time;
    }
    
    struct Sender {
        string name;
        string key;
        address addr;
    }

    event CreationSuccess(bytes32 id, string question);

    event VoteSuccess(bytes32 id, uint256[] results);

    mapping(bytes32 => Poll) poll_by_id;
    bytes32[] PollsId;

    function createNewPoll(
        string memory _question,
        string[] memory _options,
        string memory _name,
        string memory _key,
        address _addr
    ) public {
        bytes32 _id = keccak256(abi.encodePacked(_question, now, _key));
        Poll storage poll = poll_by_id[_id];
        PollsId.push(_id);
        poll.id = _id;
        poll.sender.name = _name;
        poll.sender.key = _key;
        poll.sender.addr = _addr;
        poll.question = _question;
        poll.options = _options;
        poll.results = new uint256[](_options.length);

        emit CreationSuccess(poll.id, poll.question);
    }

    function getPollById(bytes32 _id)
        public
        view
        returns (
            string memory question,
            string[] memory _options,
            uint256[] memory results
        )
    {
        Poll storage poll = poll_by_id[_id];
        return (poll.question, poll.options, poll.results);
    }

    function getPollsId() public view returns (bytes32[] memory) {
        return PollsId;
    }

    function voteForOptions(
        bytes32 _id,
        uint8 voted_index,
        string memory _key
    ) public {
        Poll storage poll = poll_by_id[_id];
        require(validVoter(_key));
        poll.results[voted_index] += 1;

        emit VoteSuccess(_id, poll.results);
    }

    /*
     * Voters can only vote once
     */
    function validVoter(bytes32 _id, string memory new_voter_key) public view returns (bool) {
        Poll storage poll = poll_by_id[_id];
        for (uint8 i = 0; i < poll.voters_Key.length; i++) {
            if (StringUtils.equal(poll.voters_Key[i], new_voter_key)) return true;
        }
        return false;
    }
}
