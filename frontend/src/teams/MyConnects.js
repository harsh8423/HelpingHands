import React, { useContext, useEffect, useState } from "react";
import ContextApi from "../ApiAndComponent/ContextApi";
import UserNavbar from "../ApiAndComponent/UserNavbar";
import profileIcon from "../images/icons8-profile-80.png";
import { useNavigate } from "react-router-dom";

export default function MyConnects() {
  const a = useContext(ContextApi);
  const [connects, setconnects] = useState([]);
  const [requests, setrequests] = useState(false)
  let navigate = useNavigate();

  const isMobile = window.innerWidth <= 700; // Adjust the breakpoint as needed


  const connectRequest = async () => {
    const response = await fetch("https://helping-hands-api.vercel.app/api/Myconnect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: a.user._id,
      }),
    });
    const json = await response.json();
    const connect = json.userData;
    console.log(json);
    if (json.success) {
      setconnects(connect);
      console.log("connect", connect);
    }

    if (!json.success) {
      console.log("Something went wrong");
    }
  };

  const acceptRequest = async (user) => {
    const response = await fetch("https://helping-hands-api.vercel.app/api/Acceptconnect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: a.user._id,
        userID: user._id,
      }),
    });
    const json = await response.json();
    const userdata = json.connect;
    console.log("userdata", userdata);
    if (json.success) {
      console.log("success");
      setconnects(userdata);
    }

    if (!json.success) {
      console.log("Something went wrong");
    }
  };

  useEffect(() => {
    connectRequest();
  }, []);

  // const ProjectProposal = (user) => {
  //   navigate("../PublicViewProfilePage", { state: user });
  // };

  return (
    <>
      <UserNavbar />
      <div className="container mt-5">
        <h2>
          My Connects <hr style={{ borderWidth: "3px" }} />
        </h2>

        <div className="row">
          <div
            className="col-sm-3 col-12 mt-1"
            style={{
              borderLeft: "2px solid grey",
              borderRight: "2px solid grey",
            }}
          >
            <div className="container-fluid mt-1">
              {isMobile? (
                <button className="button-6" onClick={()=>{setrequests(true)}}>
                Connect Request <hr style={{ borderWidth: "3px" }} />
              </button>
              ):(
                <h4 >
                Connect Request <hr style={{ borderWidth: "3px" }} />
              </h4>
              )}
              {(requests || !isMobile) && (
                <div className="row">
                {connects.map((connect) => {
                  var status = connect.status;
                  var count = 0;
                  if (status !== "requested") {
                    count += 1;
                  }
                  var dateObj = new Date(connect.requestDate);
                  var options = {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  };
                  var formattedDate = dateObj.toLocaleDateString(
                    "en-US",
                    options
                  );
                  var user = connect.userID;
                  return (
                    <>
                      {status === "requested" && (
                        <>
                          <div
                            className="col-12 p-3 mt-3 normal-box "
                            style={{ borderRadius: "0px", height: "80px" }}
                          >
                            <p>
                              <span
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  color: "green",
                                }}
                              >
                                {connect.userID.personalInfo[0].name}
                              </span>
                              <img
                                style={{ float: "right", cursor: "pointer" }}
                                src={profileIcon}
                                width={40}
                                height={40}
                                alt="..."
                              />
                              <br />
                              <span
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "bold",
                                  color: "blue",
                                }}
                              >
                                {connect.userID.personalInfo[0].title}
                              </span>{" "}
                              <br />
                              <span
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "bold",
                                  color: "grey",
                                }}
                              >
                                {formattedDate}
                              </span>
                            </p>
                          </div>
                          <button
                            className="col-6 button-6"
                            style={{ borderRadius: "0px" }}
                            onClick={() => {
                              navigate("../PublicViewProfilePage", {
                                state: user,
                              });
                            }}
                          >
                            Profile
                          </button>
                          <button
                            className="col-6 button-6"
                            onClick={() => {
                              acceptRequest(user);
                            }}
                            style={{
                              borderRadius: "0px",
                              backgroundColor: "#2ee59c8e",
                            }}
                          >
                            Accept
                          </button>
                        </>
                      )}
                      {count && (
                        <div className="col-12">No Pending Request</div>
                      )}
                    </>
                  );
                })}
              </div>
              )}
            </div>
          </div>
          <div className="col-sm-9 col-12">
            <div className="container-fluid mt-1">
              <div className="row">
                {connects.map((connect) => {
                  var status = connect.status;
                  var user = connect.userID;

                  return (
                    <>
                      {status === "accepted" && (
                        <>
                          <div
                            className="col-sm-3 col-12 p-3 m-2 normal-box "
                            style={{ borderRadius: "0px", height: "" }}
                          >
                            <p>
                              <span
                                style={{
                                  fontSize: "17px",
                                  fontWeight: "bold",
                                  color: "green",
                                }}
                              >
                                {connect.userID.personalInfo[0].name}
                              </span>
                              <img
                                style={{ float: "right", cursor: "pointer" }}
                                src={profileIcon}
                                onClick={() => {
                                  navigate("../PublicViewProfilePage", {
                                    state: user,
                                  });
                                }}
                                width={40}
                                height={40}
                                alt="..."
                              />
                              <br />
                              <span
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "bold",
                                  color: "blue",
                                }}
                              >
                                {connect.userID.personalInfo[0].title}
                              </span>{" "}
                            </p>
                            <div>
                              <button
                                onClick={() => {
                                  navigate("../ChatRoom", {
                                    state: connect.userID._id,
                                  });
                                }}
                                className="button-6"
                                style={{ borderRadius: "0px" }}
                              >
                                Message
                              </button>
                              <button
                                className="button-6"
                                style={{
                                  borderRadius: "0px",
                                }}
                              >
                                Invite
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
