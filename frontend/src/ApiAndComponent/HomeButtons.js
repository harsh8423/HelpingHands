import React,{useContext} from 'react'
import { useNavigate } from "react-router-dom";
import ContextApi from "./ContextApi";
import arrowIcon from "../images/right-arrow.png";
import contractIcon from "../images/contract.png";
import myjobIcon from "../images/promotion.png";
import myproposalIcon from "../images/proposal.png";
import portIcon from "../images/icons8-portfolio-48.png";

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
    <div className='container-fluid'>
        <div className="row">
        <span
            className="col-3 m-2 p-3 normal-box"
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
                Adding a project may increase your chances of earning by 7
                times.
              </span>
            </p>
          </span>
          <span
            className="col-3 m-2 p-3 normal-box"
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
                Post project and find the creect matching skill teammates of your choice
              </span>
            </p>
          </span>
          <span
            className="col-3 m-2 p-3 normal-box"
            onClick={handleMyProposals}
            style={{
              fontWeight: "bolder",
              backgroundColor: "RGB(235,241,231)",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            My Contract and Proposals
            <img
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
              View your active contracts, proposals, offers,and Teammates invitations.
            </p>
          </span>
          <span
            className="col-2 m-2 p-3 normal-box"
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
          </span>
        </div>
      
    </div>
  )
}
