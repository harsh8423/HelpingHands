// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract info {
    // Struct to represent a memo
    struct Memo {
        string name;
        string message;
        uint timestamp;
        address from;
    }

    // Array to store memos
    Memo[] public memos;
    
    // Owner address that will receive funds
    address payable public owner;

    // Constructor to set the contract owner
    constructor() {
        owner = payable(msg.sender);
    }

    // Function to send a memo and transfer funds to the owner
    function debit(string calldata name, string calldata message) external payable {
        owner.transfer(msg.value);
        memos.push(Memo(name, message, block.timestamp, msg.sender));
    }

    // Function to get all memos
    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}
