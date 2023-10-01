import React, { useState, useContext,useEffect } from "react";
import UserNavbar from "../ApiAndComponent/UserNavbar";
import ContextApi from "../ApiAndComponent/ContextApi";
import profileIcon from "../images/icons8-profile-80.png"
import { useNavigate } from "react-router-dom";
import "../css/LoginCss.css"

export default function TeamReaquests() {
  const a = useContext(ContextApi);
  let navigate = useNavigate();

  const [requests, setrequests] = useState([]);
  const getTeamRequests = async () => {
    const response = await fetch("https://helping-hands-api.vercel.app/api/getTeamRequests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: a.user._id,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      const teamData = json.team;
      setrequests(teamData);
      console.log(teamData);
    }

    if (!json.success) {
      console.error("Something went wrong");
    }
  };


  const acceptRequests = async (teamID) => {
    const response = await fetch("https://helping-hands-api.vercel.app/api/acceptRequests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: a.user._id,
        teamID: teamID,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      navigate("../TeamRoom", { state: teamID })
    }

    if (!json.success) {
      console.error("Something went wrong");
    }
  };

  const navigateTeam = () => {
    console.log("cliked");
    navigate("../CreateTeam");
  };

  useEffect(() => {
    getTeamRequests();
  }, []);

  return (
    <div className="container">
      <UserNavbar />
      <div className="row">
        {requests.map((request) => {
          return (
            <>
            {request.status==="requested" && <div className="p-3 mt-3 normal-box" style={{ minWidth: "290px" }}>
              <p>
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "green",
                  }}
                >
                  {request?.teamName}
                </span>
                <img
                  style={{ float: "right", cursor: "pointer" }}
                  src={profileIcon}
                  width={60}
                  height={60}
                  alt="..."
                />
                <br />
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    color: "grey",
                  }}
                >
                  {request?.moto}
                </span>
              </p>
              <div className="text-center">
                <button className="button-6" onClick={()=>{acceptRequests(request.teamID)}}>Accept</button>
              </div>
            </div>}
            </>
          );
        })}
      </div>
      <div className="row">
        <div className="col-12 m-5">
            <button className="button-6" onClick={navigateTeam}>
                Create Team
            </button>
        </div>
      </div>
    </div>
  );
}
