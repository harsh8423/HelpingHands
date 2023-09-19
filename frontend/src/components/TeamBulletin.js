import React, { useState, useContext, useEffect } from "react";
import ContextApi from "../components/ContextApi";
import { toast, Toaster } from "react-hot-toast";

export default function TeamBulletin(props) {

  const [TeamBulletin, setTeamBulletin] = useState([]);
  const currentTime = new Date().getTime();
  const a = useContext(ContextApi);
  
  const [pageState, setpageState] = useState("compose");
  
  const [message, setmessage] = useState("");
  const onChangeHander = (event) => {
    setmessage(event.target.value);
  };
  
  const Xcreateteam = async () => {
    const response = await fetch("http://localhost:5000/api/TeamBulletin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teamID: a.user.team.teamID,
        sender: a.user.personalInfo[0].name,
        message: message,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      const bulletins = json.bulletins;
      setTeamBulletin(bulletins);
      setpageState("compose");
      toast.success("message added to team bulletin");
    }
    
    if (!json.success) {
      toast.error("Something went wrong");
    }
  };
  
  const getBulletins = async () => {
    const response = await fetch("http://localhost:5000/api/getBulletins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teamID: a.user.team.teamID? a.user.team.teamID:props.teamID,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      const bulletins = json.bulletins;
      setTeamBulletin(bulletins);
    }
    
    if (!json.success) {
      toast.error("Cannot fetch Team Bulletins");
    }
  };

  useEffect(() => {
    getBulletins();  
    }, [])


  return (
    <div
    className="col-12 normal-box p-2"
    style={{
      borderLeft: "5px solid red",
        borderRight: "5px solid red",
        height: "200px",
        overflow: "auto",
      }}
    >
      <Toaster toastOptions={{ duration: 3000 }} />
      <h3
        style={{
          fontWeight: "bold",
          color: "red",
          textDecoration: "underline",
        }}
      >
        Team Bulletin
      </h3>
      {pageState==="compose" && TeamBulletin?.map((bulletin)=>{
        var dateStamp = bulletin.dateStamp
        var postingDate = currentTime - dateStamp;
        var days = Math.floor(postingDate / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
          (postingDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor(
          (postingDate % (1000 * 60 * 60)) / (1000 * 60)
        );

        var timeRemaining = `${days}d ${hours}h ${minutes}m ago`;
        if (hours < 1) {
          if(minutes===0){
            timeRemaining='Just now'
          }else{

            timeRemaining = `${minutes}min ago`;
          }
        } else if (days < 1) {
          timeRemaining = `${hours}hr ago`;
        } else {
          timeRemaining = `${days}day ago`;
        }
        return(
          <div>
            <span style={{color:"blue", fontWeight:"bold"}}>{bulletin.sender}{ }</span>
            <span style={{fontWeight:"bold", padding:"15px"}}>{bulletin.message}</span>
            <span style={{fontWeight:"bold", float:"right", color:"grey"}}>{timeRemaining}</span>
          </div>
        )
      })}
      {(!TeamBulletin && pageState==="compose") && (
        <div className="text-center">
          <span style={{ fontWeight: "bold", fontSize: "30px", color: "grey" }}>
            No Bulletin
          </span>
        </div>
      )}
      {pageState === "cancel" && (
        <>
          <label htmlFor="Message"></label>
          <textarea
            className="text-center m-1 button-6"
            rows="6"
            cols="60"
            name="description"
            placeholder="Write your message"
            value={message}
            onChange={onChangeHander}
            required
          />
          <button
            onClick={Xcreateteam}
            style={{
              position: "absolute",
              right: "20px",
              bottom: "20px",
            }}
            className="button-55"
          >
            Send
          </button>
        </>
      )}
      <div style={{ position: "relative" }}>
        <span style={{ float: "right" }}>
          <button className="button-07" onClick={()=>{if(pageState==="cancel"){setpageState("compose")}else{setpageState("cancel")}}}>{pageState}</button>
        </span>
      </div>
    </div>
  );
}
