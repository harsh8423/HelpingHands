import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ContextApi from "./ContextApi";
import arrowIcon from "../images/right-arrow.png";
import contractIcon from "../images/contract.png";
import myjobIcon from "../images/promotion.png";
import myproposalIcon from "../images/proposal.png";
import portIcon from "../images/icons8-portfolio-48.png";
import "./homeBanner.css";

export default function HomeButtons() {
  const a = useContext(ContextApi);
  const id = a.user._id;
  let navigate = useNavigate();

  const handlePostJob = () => {
    navigate("../PostJob");
  };
  const handleBuildPortfolio = () => {
    navigate("../BuildProfile");
  };

  const handleMyContracts = () => {
    navigate("../PostJob");
  };

  const handleMyProposals = () => {
    navigate("../MyContractandProposal");
  };

  return (
    <div className="container-fluid">
      <div className="home-button mt-2">
        <div
          className="normal-box"
          onClick={handleBuildPortfolio}
          style={{
            fontWeight: "bolder",
            backgroundColor: "rgb(221, 229, 232)",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Build Profile
          <img
          className="arrow"
            style={{ float: "right", padding: "4px" }}
            src={arrowIcon}
            width={30}
            height={30}
            alt="..."
          />
          <br />
          <p
            className="mt-2"
            style={{
              fontSize: "14px",
              fontWeight: "normal",
              lineHeight: "1.2",
            }}
          >
            {" "}
            <img
              style={{ float: "right" }}
              src={portIcon}
              width={50}
              height={50}
              alt="..."
            />
            <span>
              Adding a project may increase your chances of earning by 7 times.
            </span>
          </p>
        </div>
        <div
          className="normal-box"
          onClick={handleMyContracts}
          style={{
            fontWeight: "bolder",
            backgroundColor: "RGB(235,240,245)",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Post Project
          <img
          className="arrow"
            style={{ float: "right", padding: "4px" }}
            src={arrowIcon}
            width={30}
            height={30}
            alt="..."
          />
          <br />
          <p
            className="mt-2"
            style={{
              fontSize: "14px",
              fontWeight: "normal",
              lineHeight: "1.2",
            }}
          >
            {" "}
            <img
              style={{ float: "right" }}
              src={contractIcon}
              width={50}
              height={50}
              alt="..."
            />
            <span>
              {" "}
              Post project and find the creect matching skill teammates of your
              choice
            </span>
          </p>
        </div>
        <div
          className="normal-box"
          onClick={handleMyProposals}
          style={{
            fontWeight: "bolder",
            backgroundColor: "RGB(235,241,231)",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Contract & Proposals
          <img 
          className="arrow"
            style={{ float: "right", padding: "4px" }}
            src={arrowIcon}
            width={30}
            height={30}
            alt="..."
          />
          <br />
          <p
            className="mt-2"
            style={{
              fontSize: "14px",
              fontWeight: "normal",
              lineHeight: "1.2",
            }}
          >
            {" "}
            <img
              style={{ float: "right" }}
              src={myproposalIcon}
              width={50}
              height={50}
              alt="..."
            />
            View your active contracts, proposals
            invitations.
          </p>
        </div>
        <div
          className="normal-box"
          onClick={handleMyProposals}
          style={{
            fontWeight: "bolder",
            backgroundColor: "rgb(216, 235, 240)",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          My Jobs
          <img
          className="arrow"
            style={{ float: "right", padding: "4px" }}
            src={arrowIcon}
            width={30}
            height={30}
            alt="..."
          />
          <br />
          <p
            className="mt-2"
            style={{
              fontSize: "14px",
              fontWeight: "normal",
              lineHeight: "1.2",
            }}
          >
            {" "}
            <img
              style={{ float: "right" }}
              src={myjobIcon}
              width={50}
              height={50}
              alt="..."
            />
            View your active jobs, exchanges.
          </p>
        </div>
      </div>
    </div>
  );
}
