
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { ethers } from "ethers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(__dirname));
app.use(express.json());

const { abi } = await import("./artifacts/contracts/Voting.sol/Voting.json", { assert: { type: "json" } });
const provider = new ethers.providers.JsonRpcProvider(process.env.API_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractInstance = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, signer);

// Serve HTML
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.get("/index.html", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.get("/ListVoters.html", (req, res) => res.sendFile(path.join(__dirname, "ListVoters.html")));

// Optional backend route (not required if frontend uses MetaMask)
app.post("/vote", async (req, res) => {
    try {
        const name = req.body.vote;
        if (!name) return res.status(400).send("Candidate name required");
        const votingOpen = await contractInstance.getVotingStatus();
        if (!votingOpen) return res.send("Voting is finished");
        const tx = await contractInstance.addCandidate(name);
        await tx.wait();
        res.send("Candidate added successfully!");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error: " + (err.reason || err.message));
    }
});


app.listen(port, () => console.log("Server running on port", port));
