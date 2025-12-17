// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedVoting {

    address public owner;
    uint public candidatesCount;
    uint public votingEndTime;

    struct Candidate {
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public hasVoted;

    event CandidateAdded(uint indexed candidateId, string name);
    event Voted(address indexed voter, uint indexed candidateId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor(uint _votingDurationInMinutes) {
        owner = msg.sender;
        votingEndTime = block.timestamp + (_votingDurationInMinutes * 1 minutes);
    }

   
    function addCandidate(string memory _name) public onlyOwner {
        require(bytes(_name).length > 0, "Candidate name cannot be empty");

        candidatesCount++;
        candidates[candidatesCount] = Candidate(_name, 0);

        emit CandidateAdded(candidatesCount, _name);
    }

  
    function vote(uint _candidateId) public {
        require(block.timestamp < votingEndTime, "Voting has ended");
        require(!hasVoted[msg.sender], "You have already voted");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");

        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount++;

        emit Voted(msg.sender, _candidateId);
    }

 
    function getCandidateCount() public view returns (uint) {
        return candidatesCount;
    }

   
    function getCandidate(uint _candidateId) 
        public 
        view 
        returns (string memory name, uint voteCount) 
    {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");

        Candidate memory c = candidates[_candidateId];
        return (c.name, c.voteCount);
    }

   
    function getWinner()
        public
        view
        returns (uint winnerId, string memory winnerName, uint winnerVotes)
    {
        require(block.timestamp >= votingEndTime, "Voting is not ended yet");
        require(candidatesCount > 0, "No candidates available");

        uint maxVotes = 0;
        uint winningId = 1;

        for (uint i = 1; i <= candidatesCount; i++) {
            if (candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                winningId = i;
            }
        }

        Candidate memory winner = candidates[winningId];
        return (winningId, winner.name, winner.voteCount);
    }
}
