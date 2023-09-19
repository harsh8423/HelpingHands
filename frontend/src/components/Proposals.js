import React, { useEffect, useState } from "react";
import "../css/LoginCss.css"
import profileIcon from "../images/icons8-profile-80.png"
import { useNavigate } from "react-router-dom";

export default function Proposals(props) {
  const { id } = props;
  const [req, setreq] = useState([]);
  let navigate = useNavigate();

  const proposals = async () => {
    const response = await fetch("http://localhost:5000/api/proposals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      const data = json.proposals;
      console.log("retrieved");
      console.log("proposals",data);
      setreq(data);
    }
    if (!json.success) {
      //   toast.error("not retrieved");
      console.log("not retrieved");
    }
  };
  useEffect(() => {
    proposals();
  }, []);
  return (
    <div className="row">
      <div className="col-12">
        <h3>Proposals</h3>
        {req && (
          <div className="container">
            <div className="row">
              {req.map((request) => {
                return (
                  <div
                    className="p-3 mt-3 normal-box"
                    style={{minWidth:"290px"}}
                  >
                    <p>
                      <span style={{ fontSize: "20px", fontWeight: "bold", color:"green" }}>
                        {request.proposalID.personalInfo[0].name}
                      </span>
                      <img style={{float:"right", cursor:"pointer"}} src={profileIcon} width={60} height={60} alt="..." />
                      <br />
                      <span
                        style={{
                          fontSize: "15px",
                          fontWeight: "bold",
                          color: "grey",
                        }}
                        >
                      {request.proposalID.personalInfo[0].title}
                      </span>
                    </p>
                    <div className="text-center">
                    <button className="button-6">Cover letter</button>
                    <button className="button-6" onClick={() => {
                      navigate("../ChatRoom", { state: request._id });
                    }}>Message</button>
                    {request.status==="pending"? <button className="button-6" onClick={()=>{navigate("../JobConfirmLetter", {state:request.proposalID._id})}}>Confirm</button>: <span>Sent</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
