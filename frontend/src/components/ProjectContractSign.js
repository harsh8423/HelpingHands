import React from "react";
import { ethers } from "ethers";

export default function ProjectContractSign(props) {
  const { confirmation, project, state } = props;
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  const projectTransactions = async () => {
    if (true) {
      const { contract } = state;
      const name = project.projectTitle
      const message = confirmation?.budget;
      console.log("hhhhhhh",name, message, contract);
      const amount = { value: ethers.utils.parseEther("0") };
      const transaction = await contract.debit(name, message, amount);
      await transaction.wait();
      console.log("Transaction is done");
      const memosMessage = async () => {
        const memos = await contract.getMemos();
        setMemos(memos);
      };
    }
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
    <div className="text-center">
      <button className="button-07" onClick={projectTransactions}>
        Accept
      </button>
    </div>
  );
}
