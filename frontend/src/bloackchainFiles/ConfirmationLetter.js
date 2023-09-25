import React, { useState, useEffect } from "react";
import "../css/LoginCss.css";
import abi from "../contract/info.json";
import { ethers } from "ethers";
import ProjectContractSign from "./ProjectContractSign";
import Memos from "./Memos";

/**
 * ConfirmationLetter Component
 *
 * This component displays a confirmation letter for a project and allows users
 * to interact with a smart contract for project confirmation.
 *
 * @param {Object} props - Component props containing `confirmation` and `project` details.
 */
export default function ConfirmationLetter(props) {
  const { confirmation, project } = props;

  // State for managing component visibility
<<<<<<< HEAD
  // const [pageState, setpageState] = useState(true);
=======
  const [pageState, setpageState] = useState(true);
>>>>>>> a0be1b0e0cf3e907201934ec80935068d465c51c

  // State for managing Ethereum provider, signer, and contract
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  // State for storing the connected Ethereum account
  const [account, setAccount] = useState("None");
<<<<<<< HEAD
=======

  useEffect(() => {
    /**
     * Connect to Wallet Function
     *
     * This function initializes the connection to the Ethereum wallet (e.g., MetaMask)
     * and sets up the necessary Ethereum provider, signer, and contract for interaction.
     */
    const connectWallet = async () => {
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;
>>>>>>> a0be1b0e0cf3e907201934ec80935068d465c51c

  // useEffect(() => {
  /**
   * Connect to Wallet Function
   *
   * This function initializes the connection to the Ethereum wallet (e.g., MetaMask)
   * and sets up the necessary Ethereum provider, signer, and contract for interaction.
   */
  //   const connectWallet = async () => {
  //     const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  //     const contractABI = abi.abi;

<<<<<<< HEAD
  //     try {
  //       const { ethereum } = window;

  //       if (ethereum) {
  //         const account = await ethereum.request({
  //           method: "eth_requestAccounts",
  //         });

  //         const provider = new ethers.providers.Web3Provider(ethereum);
  //         const signer = provider.getSigner();
  //         const contract = new ethers.Contract(
  //           contractAddress,
  //           contractABI,
  //           signer
  //         );

  //         setAccount(account);
  //         setState({ provider, signer, contract });
  //       } else {
  //         alert("Please install MetaMask");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   connectWallet();
  // }, []);

=======
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );

          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install MetaMask");
        }
      } catch (error) {
        console.log(error);
      }
    };

    connectWallet();
  }, []);

>>>>>>> a0be1b0e0cf3e907201934ec80935068d465c51c
  /**
   * Project Transactions Function
   *
   * This function sends a POST request to a local API to record project transactions.
   * It includes information such as project ID, transaction type, amount, client ID, and project name.
   */
  const projectTransactions = async () => {
<<<<<<< HEAD
    const response = await fetch(
      "http://localhost:5000/api/projectTransactions",
      {
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
      }
    );
=======
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
>>>>>>> a0be1b0e0cf3e907201934ec80935068d465c51c

    const json = await response.json();

    if (json.success) {
      console.log("Transaction recorded successfully");
    } else {
      console.log("Transaction recording failed");
    }
  };

  return (
    <>
      <div className="row">
<<<<<<< HEAD
        <h1 style={{ color: "green", fontWeight: "bold" }}>
          Confirmation Letter Project: {project.projectTitle}
        </h1>
        <div className="col-12 normal-box p-5 mt-4">
          <div className="container">
            <div style={{ border: "2px solid grey" }} className="row p-5">
              <div
                className="col-12"
                style={{ fontsize: "12px", position: "relative" }}
              >
                {confirmation?.letter}
                <span
                  style={{
                    float: "right",
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  {confirmation?.status}
                </span>
                <h4>Final Credit Offered: {confirmation?.budget}</h4>
              </div>
            </div>

            {/* Render the ProjectContractSign component */}
            <div className="row">
              <ProjectContractSign
                state={state}
                project={project}
                confirmation={confirmation}
              />
            </div>
=======
        <div className="col-12">
          {/* Toggle between displaying project details and memos */}
          <button
            className="button-07"
            onClick={() => {
              if (pageState) {
                setpageState(false);
              } else {
                setpageState(true);
              }
            }}
          >
            {pageState ? "Show Transactions" : "Back"}
          </button>
        </div>
        <br />
        {pageState ? (
          // Display project confirmation letter and details
          <>
            <h1 style={{ color: "green", fontWeight: "bold" }}>
              Confirmation Letter Project: {project.projectTitle}
            </h1>
            <div className="col-12 normal-box p-5 mt-4">
              <div className="container">
                <div style={{ border: "2px solid grey" }} className="row p-5">
                  <div
                    className="col-12"
                    style={{ fontsize: "12px", position: "relative" }}
                  >
                    {confirmation?.letter}
                    <span
                      style={{
                        float: "right",
                        color: "red",
                        fontWeight: "bold",
                      }}
                    >
                      {confirmation?.status}
                    </span>
                    <h4>Final Credit Offered: {confirmation?.budget}</h4>
                  </div>
                </div>

                {/* Render the ProjectContractSign component */}
                <div className="row">
                  <ProjectContractSign
                    state={state}
                    project={project}
                    confirmation={confirmation}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          // Display memos using the Memos component
          <div className="row">
            <Memos state={state} />
>>>>>>> a0be1b0e0cf3e907201934ec80935068d465c51c
          </div>
        </div>
      </div>
    </>
  );
}
