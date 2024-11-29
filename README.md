# Decentralized Game with Smart Contract

This project is a simple decentralized game built on the Ethereum blockchain, where players can play a color-based game by sending 1 ETH. The contract simulates a game outcome (either "Red" or "Black") and issues a "ticket" to the winner. The game is integrated with MetaMask for interacting with the Ethereum network.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Smart Contract](#smart-contract)
- [Frontend](#frontend)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)
- [License](#license)

---

## Project Overview

This project simulates a game where players send 1 ETH to play. The smart contract determines a random winner between "Red" and "Black" based on the timestamp. If the player's chosen color matches the random color, they "win" a ticket. The ticket is simply a message displayed on the frontend.

---

## Features

- Play a game with 1 ETH: Send exactly 1 ETH to the smart contract.
- Randomly determine the winner (Red or Black) using blockchain data.
- Display game result and issue a ticket message to the winner.
- Reset the game with a single click.
- Frontend integrated with MetaMask for Ethereum interaction.
- Fully decentralized game logic powered by Solidity smart contract.

---

## Installation

To run the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/decentralized-game.git