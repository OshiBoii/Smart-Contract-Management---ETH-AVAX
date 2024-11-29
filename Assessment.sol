// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;

    event GameResult(address indexed player, string result, string chosenColor, string winningColor);
    event TicketIssued(address indexed player, string message);

    // Constructor sets initial owner
    constructor() {
        owner = payable(msg.sender);
    }

    // Function where players can play the game with 1 ETH
    function playGame(string memory chosenColor) public payable {
        // Require exactly 1 ETH to play
        require(msg.value == 1 ether, "Only 1 ETH to play!");

        // Determine the "random" winning color (red or black)
        string memory winningColor = randomColor();

        // Check if the player won or lost
        string memory result;
        if (keccak256(abi.encodePacked(chosenColor)) == keccak256(abi.encodePacked(winningColor))) {
            result = "Won!";
            // Emit event for the win and issue a ticket for the player
            emit TicketIssued(msg.sender, "Congratulations! You've won a ticket. You can cash it out by presenting it to the dealer.");
        } else {
            result = "Lost! Better luck next time!";
        }

        // Emit an event with the game result
        emit GameResult(msg.sender, result, chosenColor, winningColor);
    }

    // Simple function to simulate random color selection
    function randomColor() private view returns (string memory) {
        if (block.timestamp % 2 == 0) {
            return "red";
        } else {
            return "black";
        }
    }
}