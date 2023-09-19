import React from "react";
import "../css/LoginCss.css";

import abi from "../contract/info.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ProjectContractSign from "./ProjectContractSign";
import Memos from "./Memos";
export default function ConfirmationLetter(props) {
  const { confirmation, project } = props;
  console.log(confirmation);

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          // window.ethereum.on("chainChanged", () => {
          //   window.location.reload();
          // });

          // window.ethereum.on("accountsChanged", () => {
          //   window.location.reload();
          // });

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
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  console.log("state",state);

  const projectTransactions = async () => {
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
        projectName: project.projectTitle
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      console.log("retrieved");
      
    }
    if (!json.success) {
      console.log("not retrieved");
    }
  };

  return (
    <div className="row">
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
                style={{ float: "right", color: "red", fontWeight: "bold" }}
              >
                {confirmation?.status}
              </span>
              <h4>Final Credit Offered: {confirmation?.budget}</h4>
            </div>
          </div>
          
          <div className="row">
            <ProjectContractSign state={state} project={project} confirmation={confirmation} />
            <Memos state={state}/>
          </div>
          <div className="row">

          </div>
        </div>
      </div>
    </div>
  );
}
