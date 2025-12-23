let WALLET_CONNECTED = "";
let contractAddress = "0x3b4a882e256e28Ef928Fc1e64EE78894aF87D20C";
let contractAbi =  [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "addCandidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "_candidateNames",
				"type": "string[]"
			},
			{
				"internalType": "uint256",
				"name": "_votingDurationInMinutes",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "candidateId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "CandidateAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateId",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "voter",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "candidateId",
				"type": "uint256"
			}
		],
		"name": "Voted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidates",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "candidatesCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllCandidates",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "voteCount",
						"type": "uint256"
					}
				],
				"internalType": "struct DecentralizedVoting.Candidate[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateId",
				"type": "uint256"
			}
		],
		"name": "getCandidate",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCandidateCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRemainingTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getVotingStatus",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWinner",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "winnerId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "winnerName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "winnerVotes",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasVoted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "votingEndTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
let contractInstance;
let signer;

// Connect MetaMask
const connectMetamask = async () => {
    if (window.ethereum) {
        try {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            WALLET_CONNECTED = await signer.getAddress();
            contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
            document.getElementById("metamasknotification").innerText = "MetaMask connected: " + WALLET_CONNECTED;
        } catch (err) {
            alert(err.message);
        }
    } else {
        alert("Install MetaMask!");
    }
};

// Add Candidate
const addCandidate = async () => {
    const name = document.getElementById("candidateName").value;
    if (!name) return alert("Enter candidate name");
    if (!WALLET_CONNECTED) return alert("Connect MetaMask first");

    try {
        const tx = await contractInstance.addCandidate(name);
        document.getElementById("addCandidateMsg").innerText = "Adding candidate...";
        await tx.wait();
        document.getElementById("addCandidateMsg").innerText = `Candidate "${name}" added!`;
    } catch (err) {
        console.error(err);
        document.getElementById("addCandidateMsg").innerText = err.reason || err.message;
    }
};

// Vote
const addVote = async () => {
    const candidateId = parseInt(document.getElementById("vote").value);
    const cand = document.getElementById("cand");
    if (!WALLET_CONNECTED) return cand.innerText = "Connect MetaMask first";

    try {
        const tx = await contractInstance.vote(candidateId);
        cand.innerText = "Processing vote...";
        await tx.wait();
        cand.innerText = "Vote added!";
    } catch (err) {
        console.error(err);
        cand.innerText = err.reason || err.message;
    }
};

// Voting Status
const voteStatus = async () => {
    if (!WALLET_CONNECTED) return document.getElementById("status").innerText = "Connect MetaMask first";

    try {
        const isOpen = await contractInstance.getVotingStatus();
        const time = await contractInstance.getRemainingTime();
        document.getElementById("status").innerText = isOpen ? "Voting is open" : "Voting has finished";
        document.getElementById("time").innerText = `Remaining time: ${time.toString()} seconds`;
    } catch (err) {
        console.error(err);
    }
};

// List All Candidates
const getAllCandidates = async () => {
    if (!WALLET_CONNECTED) return document.getElementById("p3").innerText = "Connect MetaMask first";

    try {
        const tableBody = document.querySelector("#myTable tbody");
        tableBody.innerHTML = "";
        const candidates = await contractInstance.getAllCandidates();
        candidates.forEach((c, i) => {
            const row = tableBody.insertRow();
            row.insertCell(0).innerText = i + 1;
            row.insertCell(1).innerText = c.name;
            row.insertCell(2).innerText = c.voteCount.toString();
        });
    } catch (err) {
        console.error(err);
    }
};
