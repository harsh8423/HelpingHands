import React, { useEffect, useState, useContext, useRef } from "react";
import UserNavbar from "../ApiAndComponent/UserNavbar";
import ContextApi from "../ApiAndComponent/ContextApi";
import { toast, Toaster } from "react-hot-toast";
import TeamBulletin from "./TeamBulletin";
import "../css/LoginCss.css";
import profileIcon from "../images/icons8-profile-80.png";
import { io } from "socket.io-client";
import CreateTeam from "./CreateTeamProject";
import addicon from "../images/addition.png";
import meeticon from "../images/meet.png";
import addmembericon from "../images/social.png";
import TeamProjects from "./TeamProjects";
import "./teamRoom.css"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function TeamRoom() {

  const isMobile = window.innerWidth <= 700; // Adjust the breakpoint as needed

  const a = useContext(ContextApi);
  let navigate = useNavigate();
  const location = useLocation();
  const user = location.state;
  const messageRef = useRef(null);

  const [team, setteam] = useState([]);
  const [requests, setrequests] = useState([]);
  const [sent, setsent] = useState(false);
  const [messages, setmessages] = useState([]);
  const [pageState, setpageState] = useState("Projects");
  const [inputMessage, setinputMessage] = useState("");
  const [postproject, setpostproject] = useState("Projects");
  const [chatPage, setchatPage] = useState(false)

  const scrollToBottom = () => {
    messageRef.current.scrollIntoView({
      behavior: "smooth",
    });
    // markAsRead();
  };

  useEffect(() => {
    if (messageRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  const getTeamData = async () => {
    var teamID = "";
    if (a.user.team) {
      teamID = a.user.team.teamID;
    } else {
      teamID = user;
    }
    console.log(teamID);
    const response = await fetch("https://helping-hands-api.vercel.app/api/getTeamData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: teamID,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      const teamData = json.team;
      setrequests(teamData.requests);
      setmessages(teamData.chatID.messages);

      console.log(teamData);
      setteam(teamData);
    }

    if (!json.success) {
      toast.error("Something went wrong");
    }
  };

  const approve = async (id) => {
    const teamID = a.user.team.teamID;
    console.log(teamID);
    const response = await fetch("https://helping-hands-api.vercel.app/api/approveRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teamID: teamID,
        id: id,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      setsent(true);
      toast.success("request sent");
    }

    if (!json.success) {
      toast.error("Something went wrong");
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log("object");

    const response = await fetch("https://helping-hands-api.vercel.app/api/endMessageX", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatID: team.chatID._id,
        senderID: a.user.personalInfo[0].name,
        message: inputMessage,
      }),
    });
    const json = await response.json();
    const messagesX = json.messages;

    if (json.success) {
      setmessages(messagesX);
      console.log("msg sent");
    }

    if (!json.success) {
      console.log("msg not sent Something went wrong");
    }
  };

  const togglepage = () => {
    if (pageState === "Projects") {
      setchatPage(false)
      setpageState("Team Detail");
    } else {
      setchatPage(false)
      setpageState("Projects");

    }
  };

  useEffect(() => {
    getTeamData();
  }, []);

  const onChangeHander = (event) => {
    setinputMessage(event.target.value);
  };

  return (
    <div>
      <UserNavbar />
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-sm-8 col-12 m-1 p-4 divWith "
            style={{ backgroundColor: "lightblue" }}
          >
            <h1
              style={{
                color: "red",
                fontWeight: "bold",
                fontFamily: "cursive",
              }}
            >
              {team.teamName}
            </h1>
            <p
              className=""
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "purple",
              }}
            >
              <span style={{ color: "black" }}>Leader </span>{" "}
              {team?.teamLeader?.personalInfo[0]?.name}
            </p>{" "}
          </div>
          <div className="menu col-sm-3 col-12">
          <div className="m-1 p-4 text-center">
            <img src={meeticon} width={60} height={60} alt="..." />
            <div style={{ fontWeight: "bold", fontSize: "12px" }}>
              Create Meet
            </div>
          </div>
          <div
            onClick={() => {
              setpageState("Team Detail");
              setpostproject("Back to Projects");
            }}
            style={{ cursor: "pointer" }}
            className="m-1 p-4 text-center"
          >
            <img src={addicon} width={60} height={60} alt="..." />
            <div style={{ fontWeight: "bold", fontSize: "12px" }}>
              Add Project
            </div>
          </div>
          <div className="m-1 p-4 text-center">
            <img src={addmembericon} width={60} height={60} alt="..." />
            <div style={{ fontWeight: "bold", fontSize: "12px" }}>
              Add Member
            </div>
          </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-12">
            <div className="togglebuttons">
              <button className="button-07 mb-4" onClick={togglepage}>
                {pageState}
              </button>
              <button className="button-07 mb-4 chatroombutton" onClick={()=>{setchatPage(true)}}>
                Chat Room
              </button>
            </div>
            {(pageState === "Projects" && !chatPage) && (
              <div className="container-fluid">
                <div className="row">
                  <TeamBulletin teamID={team?._id} />
                  <div className="col-12 normal-box p-3">
                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      Team Members{" "}
                    </p>
                    {team?.members?.map((member) => {
                      return (
                        <div
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "purple",
                          }}
                        >
                          {member?.personalInfo[0]?.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
                {team?.teamLeader?._id === a.user._id && (
                  <div className="row">
                    {requests.map((request) => {
                      return (
                        <div
                          className="p-3 mt-3 normal-box"
                          style={{ minWidth: "290px" }}
                        >
                          <p>
                            <span
                              style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "green",
                              }}
                            >
                              {request?.personalInfo[0]?.name}
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
                              {request.personalInfo[0].title}
                            </span>
                          </p>
                          <div className="text-center">
                            <button className="button-6">Profile</button>
                            {!sent ? (
                              <button
                                className="button-6"
                                onClick={() => {
                                  approve(request._id);
                                }}
                              >
                                Aprove
                              </button>
                            ) : (
                              <button className="button-6">Requested</button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
             )}
              {(pageState === "Team Detail" && !chatPage) && (
                <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    {postproject === "Back to Projects" && (
                      <button
                        className="button-6 mb-1"
                        onClick={() => {
                          setpostproject("Projects");
                        }}
                      >
                        Back To Projects
                      </button>
                    )}
                    {postproject === "Projects" ? (
                      <TeamProjects projects={team?.projects} />
                    ) : (
                      <CreateTeam />
                    )}
                  </div>
                </div>
              </div>
              )}
          </div>
          {(chatPage || !isMobile) && (
            <div
            className="col-sm-6 col-12 p-3 normal-box"
            style={{ borderRadius: "0px", height: "70vh"}}
          >
            <h3
              style={{
                fontWeight: "bold",
                fontFamily: "sans-serif",
                color: "green",
              }}
            >
              Members Chat <hr style={{ borderWidth: "3px" }} />
            </h3>
            <div style={{ height: "47vh", overflow: "auto" }}>
              {messages &&
                messages.map((message, index) => {
                  if (message.senderID === a.user.personalInfo[0].name) {
                    var Mystyle = {
                      float: "right",
                      padding: "5px 10px",
                      backgroundColor: "rgba(130, 230, 113, 0.844)",
                      fontWeight: "bold",
                    };
                  } else {
                    Mystyle = {
                      senderName: `${message.senderID}`,
                      float: "left",
                      padding: "5px 10px",
                    };
                  }

                  if (message?.dateStamp) {
                    const currentDate = new Date();
                    const messageDate = new Date(message?.dateStamp);

                    if (
                      currentDate.toDateString() === messageDate.toDateString()
                    ) {
                      // Message sent today
                      var formattedDate = messageDate.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                    } else if (
                      currentDate.getDate() - messageDate.getDate() ===
                      1
                    ) {
                      // Message sent yesterday
                      formattedDate = "Yesterday";
                    } else if (
                      currentDate.getDate() - messageDate.getDate() ===
                      2
                    ) {
                      // Message sent day before yesterday
                      formattedDate = messageDate.toLocaleDateString([], {
                        month: "numeric",
                        day: "numeric",
                        year: "2-digit",
                      });
                    } else {
                      // Message sent on a specific date
                      formattedDate = messageDate.toLocaleDateString([], {
                        month: "numeric",
                        day: "numeric",
                        year: "2-digit",
                      });
                    }
                  }
                  return (
                    <>
                      <div
                        className="m-3"
                        style={{ display: "flex", flexDirection: "column" }}
                        ref={messages.length - 1 === index ? messageRef : null}
                      >
                        <div>
                          <div className="normal-box m-0" style={Mystyle}>
                            {Mystyle?.senderName && (
                              <div
                                style={{
                                  color: "red",
                                }}
                              >
                                <small style={{ fontWeight: "bold" }}>
                                  {Mystyle?.senderName}
                                </small>
                              </div>
                            )}
                            {message.message}
                            <span
                              style={{
                                color: "grey",
                                padding: "0px 5px",
                                float: "right",
                              }}
                            >
                              <small style={{ fontWeight: "bold" }}>
                                {formattedDate}
                              </small>
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
            <div style={{ float: "bottom" }}>
              <form className="p-4" onSubmit={sendMessage}>
                <label htmlFor="password"></label>
                <input
                  className="text-center m-1 button-6"
                  style={{ width: "40vw" }}
                  type="text"
                  name="password"
                  placeholder="Write a message..."
                  value={inputMessage}
                  onChange={onChangeHander}
                  required
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    fontWeight: "bold",
                  }}
                  className="button-6"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
