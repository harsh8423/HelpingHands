import React, { useState } from "react";
import { ethers } from "ethers";

/**
 * ProjectContractSign Component
 *
 * This component allows users to accept a project confirmation and trigger a transaction
 * on the associated Ethereum smart contract.
 *
 * @param {Object} props - Component props containing `confirmation`, `project`, and `state` details.
 */
export default function ProjectContractSign(props) {
  const { confirmation, project, state } = props;

  // State to store project memos
  // const [memos, setMemos] = useState([]);
  const [memos, setMemos] = useState([]);

  // Destructure the 'contract' object from the 'state' prop
  const { contract } = state;

  /**
   * Project Transactions Function
   *
   * This function is called when the "Accept" button is clicked. It performs the following tasks:
   * 1. Calls the Ethereum smart contract's 'debit' function with project details.
   * 2. Sends a POST request to a local API to record the project transaction.
   * 3. Logs the transaction result and API response.
   */
  const projectTransactions = async () => {
    // Check if the contract object is available
    // if (contract) {
    //   const name = project.projectTitle;
    //   const message = project.id;
    //   const amount = { value: ethers.utils.parseEther("0") };

    //   try {
    //     // Call the 'debit' function on the contract
    //     const transaction = await contract.debit(name, message, amount);
    //     await transaction.wait();
    //     console.log("Transaction is done");
    //   } catch (error) {
    //     console.error("Error executing contract transaction:", error);
    //   }
    // }
    if (contract) {
      const name = project.projectTitle;
      const message = project.id;
      const amount = { value: ethers.utils.parseEther("0") };

      try {
        // Call the 'debit' function on the contract
        const transaction = await contract.debit(name, message, amount);
        await transaction.wait();
        console.log("Transaction is done");
      } catch (error) {
        console.error("Error executing contract transaction:", error);
      }
    }

    // Send a POST request to record the project transaction
    const response = await fetch("http://localhost:5000/api/projectTransactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: project.id,
        type: "debit",
        amount: confirmation.budget,
        clientID: project.proposalID,
        projectName: project.projectTitle,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      console.log("Transaction recorded successfully");
    } else {
      console.log("Transaction recording failed");
    }
  };

  return (
    <div className="text-center">
      {/* Button to trigger the 'projectTransactions' function */}
      <button className="button-07" onClick={projectTransactions}>
        Accept
      </button>
    </div>
  );
}
