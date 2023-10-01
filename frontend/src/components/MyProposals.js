import React, { useContext, useEffect, useState } from "react";
import ContextApi from "../ApiAndComponent/ContextApi";
import { toast, Toaster } from "react-hot-toast";
import "../css/LoginCss.css";
import { useNavigate } from "react-router-dom";
import ConfirmationLetter from "../bloackchainFiles/ConfirmationLetter";
export default function MyProposals() {
  const a = useContext(ContextApi);
  const userID = a.user._id;
  let navigate = useNavigate();

  const [projects, setprojects] = useState([]);
  const [confirmation, setconfirmation] = useState({})
  const [confDetail, setconfDetail] = useState({
    projectTitle: "",
    proposalType: "",
    proposalID: "",
    id:""
  })
  const [pageState, setpageState] = useState(true)
  const [descriptionStyle, setdescriptionStyle] = useState({
    height: "50px",
    overflow: "hidden",
  });

  const contract = async () => {
    const response = await fetch("http://localhost:5000/api/contracts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      const data = json.data;
      console.log("retrieved");
      console.log(data);
      setprojects(data);
    }
    if (!json.success) {
      toast.error("not retrieved");
    }
  };
  const handlestyle = () => {
    if (descriptionStyle.height === "auto") {
      setdescriptionStyle({ height: "50px", overflow: "hidden" });
    } else {
      setdescriptionStyle({ height: "auto", overflow: "" });
    }
  };
  useEffect(() => {
    contract();
  }, []);

  const x=()=>{
    navigate("../ChatRoom");

  }

  const handleConfirmatioin = (conf, projectTitle, proposalType, ProposalID, creater)=>{
    setconfirmation(conf)
    setconfDetail({
      projectTitle:projectTitle,
    proposalType:proposalType,
    proposalID: ProposalID,
    id:creater
    })
    setpageState(false)
  }

  return (
    <div>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="container mt-5">
        <h2>My Proposals</h2>
        <hr style={{ borderWidth: "3px" }} />
        {pageState? <div className="row">
          {projects.map((project) => {
            var skilled = project.skills;
            var proposals = project.proposals;
            console.log("skills: ", skilled);
            console.log("requests", proposals);
            return (
              <div>
                {proposals.map((request) => {
                  if (request.proposalID == userID) {
                    return (
                      <div
                        className="col-12 p-2"
                        style={{
                            width:"auto",
                          border: "2px solid grey",
                          borderRadius: "8px",
                        }}
                      >
                        <h5>
                          {project.title}
                          <span
                            style={{
                              float: "right",
                              margin: "5px",
                              padding: "6px",
                              cursor: "pointer",
                              borderRadius: "20px",
                              height: "auto",
                              backgroundColor: "green",
                              color: "white",
                            }}
                          >
                            {project.proposalType}
                          </span>
                        </h5>
                        <p>
                          <small style={{ fontWeight: "bold", color: "grey" }}>
                            Experience Level: {project.expLevel} | Credits:
                            {project.budget} | Est.Duration:
                            {project.projectDuration}
                          </small>
                        </p>
                        <p style={descriptionStyle}>{project.description}</p>
                        <p
                          onClick={handlestyle}
                          style={{
                            color: "blue",
                            textDecoration: "underline",
                            cursor: "pointer",
                            float: "top",
                          }}
                        >
                          Read more
                        </p>
                        {skilled.map((skill) => {
                          return (
                            <span
                              style={{
                                margin: "4px",
                                padding: "5px",
                                borderRadius: "20px",
                                height: "auto",
                                backgroundColor: "lightgrey",
                              }}
                            >
                              <small style={{ fontWeight: "bolder" }}>
                                {skill}
                              </small>
                            </span>
                          );
                        })}
                        <p className="mt-3">
                          <small style={{ fontWeight: "bold", color: "grey" }}>
                            Teammate required: {project.projectType} <br />2
                            hours ago
                          </small>

                          {request.confirmation &&
                          <span className="m-4" style={{ float: "right" }}>
                            <button className="button-6" onClick={() => {handleConfirmatioin(request.confirmation, project.title, project.proposalType, request.proposalID, project.creater)}}>Confirmation Letter</button>
                          </span>}
                          <span
                            className="m-4"
                            style={{
                              float: "right",
                              color: "red",
                              fontWeight: "bold",
                              fontSize: "20px",
                            }}
                          >
                            {request.status}
                          </span>
                          <span className="" >
                            <button className="button-6" onClick={() => {
                              navigate("../ChatRoom", { state: project.creater });
                            }}>Message</button>
                          </span>
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>: <ConfirmationLetter confirmation={confirmation} project={confDetail}/>}
      </div>
    </div>
  );
}
