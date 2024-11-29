import { useState, useEffect } from "react";
import { ethers } from "ethers";
import assessmentAbi from "../artifacts/contracts/Assessment.sol/Assessment.json";  // Correct ABI path

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [gameResult, setGameResult] = useState(""); // to display game result messages
  const [ticketMessage, setTicketMessage] = useState(""); // to display ticket issuance message

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";  // The correct address
  const atmABI = assessmentAbi.abi;  // Correct ABI

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // Once wallet is set, we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const playGame = async (chosenColor) => {
    if (atm) {
      try {
        let tx = await atm.playGame(chosenColor, { value: ethers.utils.parseEther("1.0") });
        await tx.wait();
        console.log("Game played successfully!");
      } catch (err) {
        console.error("Error playing game:", err);
      }
    }
  };

  // Function to reset the game
  const resetGame = () => {
    setGameResult(""); // Clear the game result message
    setTicketMessage(""); // Clear the ticket issuance message
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }
  
    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }
  
    return (
      <div>
        <p>Your Account: {account}</p>
        {gameResult && <p>{gameResult}</p>}
        {ticketMessage && <p>{ticketMessage}</p>}
        {!gameResult && ( // Only show play buttons if there is no game result
          <>
            <button onClick={() => playGame("red")}>Play Game (Red)</button>
            <button onClick={() => playGame("black")}>Play Game (Black)</button>
          </>
        )}
        {gameResult && ( // Show reset button only if there is a game result
          <button onClick={resetGame} style={{ marginTop: "10px" }}>
            Reset Game
          </button>
        )}
      </div>
    );
  };
  
  useEffect(() => {
    getWallet();
  }, []);

  useEffect(() => {
    if (atm) {
      // Listen for the GameResult event
      atm.on("GameResult", (player, result, chosenColor, winningColor) => {
        setGameResult(`${result} You chose ${chosenColor}, the winning color was ${winningColor}`);
      });

      // Listen for TicketIssued event (for winning players)
      atm.on("TicketIssued", (player, message) => {
        setTicketMessage(message); // Set the ticket message
      });
    }
  }, [atm]);

  return (
    <main className="container">
      <header>
        <h1>Welcome to the Lanes!</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
        }
      `}</style>
    </main>
  );
}