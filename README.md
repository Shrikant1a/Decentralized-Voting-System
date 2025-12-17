# Decentralized-Voting-System
🗳️ Decentralized Voting Smart Contract


📌 Project Overview:

This project implements a Simple Decentralized Voting System using Solidity.
It allows an owner to add candidates, enables users to vote securely (only once), and determines the winner after the voting period ends.



📁 Project Structure:

├── DecentralizedVoting.sol
├── README.md


🚀 Deployment Steps;

1).Open Remix IDE 
2).Create a new file Voting.sol
3).Paste the smart contract code
4).Compile using Solidity ^0.8.0
5).Deploy with constructor parameter:
      `_votingDurationInMinutes (e.g., 10)`
6).Interact with deployed contract using Remix UI


🛡️The contract demonstrates core Solidity fundamentals such as:-

      Structs
      Mappings
      Events
      Modifiers
      Access control
      Basic security practices 



🎯 Objective:

To build a decentralized voting smart contract that:

  Prevents double voting
  Ensures only valid candidates receive votes
  Restricts administrative actions to the owner
  Determines the winner transparently after voting ends



⚙️ Tech Stack:

    Solidity ^0.8.0
    Remix IDE
    Ethereum Testnet (Sepolia / Goerli)




📜 Smart Contract Features:

✅ Candidate Management
Owner can add candidates
Each candidate has:
                   ` name`
                   ` voteCount`
✅ Voting System
Any address can vote
Each address can vote only once
Voting is allowed only before the deadline
Emits events for transparency
  
✅ Winner Selection
After voting ends, the candidate with the highest votes is returned
In case of a tie, the first candidate with max votes wins



🧠 Contract Functions:

| Function                     | Description                        |
| ---------------------------- | ---------------------------------- |
| `addCandidate(string _name)` | Adds a new candidate (Owner only)  |
| `vote(uint _candidateId)`    | Vote for a candidate               |
| `getCandidateCount()`        | Returns total number of candidates |
| `getCandidate(uint _id)`     | Returns candidate name and votes   |
| `getWinner()`                | Returns winning candidate details  |



📡 Deployment Details:

Network: Sepolia / Goerli Testnet
Deployment Address: <<Add your deployed contract address here>>
Etherscan Link: <<Paste Etherscan link here>>


⛽ Gas Usage (Observed):

addCandidate() → Low gas (simple storage)
vote() → Optimized, single state update
getWinner() → View function, no gas when called externally


🧩 Challenges & Solutions :- 

Challenge: Preventing double voting
Solution: Used `mapping(address => bool)` to track voter participation

Challenge: Ensuring voting fairness
Solution: Implemented a voting deadline using ` block.timestamp`



📌 Conclusion:
This project demonstrates a secure and transparent decentralized voting mechanism using Solidity. It follows smart contract best practices and fulfills all assignment requirements.



👨‍💻 Author

Shrikant Aher
Blockchain Developer
Solidity | Ethereum | Smart Contracts

                                                            Thank You...  :)
