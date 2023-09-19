import React, { useContext, useState, useEffect } from "react";
import UserNavbar from "../ApiAndComponent/UserNavbar";
import ContextApi from "../ApiAndComponent/ContextApi";
import userIcon from "../images/user.png";
import "../css/starCss.css";
import resumeIcon from "../images/icons8-resume-64.png";
import webIcon from "../images/icons8-website-94.png";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useLocation } from "react-router-dom";
import "swiper/css";
import teamIcon from "../images/group.png";
import back from "../images/R.jpg";
import Filters from "../ApiAndComponent/Filters";
import { toast, Toaster } from "react-hot-toast";


export default function PublicViewProfilePage() {

  const a = useContext(ContextApi);
  const location = useLocation();
  const user = location.state;

  const navigate = useNavigate()
  console.log("user", user);

  const [connectButton, setconnectButton] = useState("+ connect")
  const co = user.connects
  console.log("co",co)

  const make = ()=>{
    co.map((connect) => {
      if (connect.userID == a.user._id && connect.status==="accepted") {
        setconnectButton("connected")
      }
      if(connect.userID == a.user._id && connect.status==="requested") {
        setconnectButton("pending")
      }
      if(connect.userID == a.user._id && connect.status==="request") {
        setconnectButton("requested")
      }
    });
  
  }

  
  const certificates = user.certifications;
  const achievements = user.achievements;

  const skilled = user.skills;
  const projects = user.projects;
  
  // const web = user.details.portfolioWebsiteURL;
  // const filepath = user.details.resumeFile;
  // const portfolioWebURL = `${web}`;
  // const pdfFilePath = require(`./Uploads/${filepath}`);

  const cliked =()=>{
    console.log("clicked")
    make()
  }
  const handlemessages = ()=>{
    navigate("../ChatRoom", { state: user._id })
  }

  useEffect(() => {
    make()
  }, [])
  
  const history = []; 

  history.push(...user.projects, ...user.certifications, ...user.achievements);

  history.sort((a, b) => {
    const aDate =
      a.completionDate instanceof Date 
        ? a.completionDate
        : new Date(a.completionDate);
    const bDate =
      b.completionDate instanceof Date
        ? b.completionDate
        : new Date(b.completionDate);

    return bDate.getTime() - aDate.getTime();
  });

  console.log("his",history);

  const handleAddToTeam = async()=>{
    const teamID = a.user.team.teamID
    console.log(teamID)
    console.log("connecting")
    const response = await fetch("http://localhost:5000/api/addtoteam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teamID: teamID,
        id: user._id,
        
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      toast.success("Requested");
    }

    if (!json.success) {
      toast.error("Something went wrong");
    }
  }


  const connectRequest = async()=>{
    console.log("connecting")
    const response = await fetch("http://localhost:5000/api/connectRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: a.user._id,
        id: user._id,
        
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      toast.success("Requested");
      setconnectButton("requested")
    }

    if (!json.success) {
      toast.error("Something went wrong");
    }
  }

  const x=()=>{
    navigate("../ChatRoom", { state: user._id });
    window.location.reload();

  }

  return (
    <div>
      <UserNavbar />
      <Toaster toastOptions={{ duration: 4000 }} />

      <div
        className="container mt-5 mb-5 p-4"
      >
        <div className="row">
          <div className="col-12">
            <div className="container">
              <div className="row">
                <div className="col-1">
                  <img src={userIcon} width={100} height={60} alt="..." />
                </div>
                <div className="col-6">
                  <div style={{ fontSize: "30px", fontWeight: "bold" }}>
                    {user.personalInfo[0].name}
                  </div>
                  <span
                  onClick={connectButton==="+ connect"? connectRequest:cliked}
                    className="col-2 text-center"
                    style={{
                      margin: "5px",
                      borderRadius: "20px",
                      height: "30px",
                      cursor: "pointer",
                      backgroundColor: "aqua",
                      fontWeight: "bold",
                    }}
                  >
                    {connectButton}
                    
                  </span>
                  <span
                    className="col-2 text-center"
                    onClick={x}
                    style={{
                      margin: "5px",
                      borderRadius: "20px",
                      cursor: "pointer",
                      height: "30px",
                      backgroundColor: "aqua",
                      fontWeight: "bold",
                    }}
                  >
                    Message
                  </span>
                </div>
                <div className="col-4 text-center">
                  <div
                    className="container-fluid normal-box "
                    style={{
                      backgroundImage: `url(${back})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="row">
                      <div className="col-3">
                        <img src={teamIcon} width={60} height={60} alt="..." />
                      </div>
                      <div className="col-5 p-3">
                        <h4
                          style={{ fontFamily: "cursive", fontWeight: "bold" }}
                        >
                          {user.team? user.team.teamName: a.user.team? <span onClick={handleAddToTeam}>Add to Team</span>:<span>Yet to join the team</span>}
                        </h4>
                      </div>
                      <p
                        className=""
                        style={{ fontWeight: "bolder", color: "white" }}
                      >
                        {user.team? user.team.moto:<>Your team awaits – let's create something extraordinary
                        together!"</>}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr style={{ borderWidth: "3px" }} />
          </div>
          <div className="col-4" style={{ height: "auto" }}>
            <div className="container-fluid m-0 p-0">
              <div className="row">
                <div
                  className="col-12 text-center"
                  style={{
                    fontWeight: "bold",
                    fontSize: "25px",
                    cursor: "pointer",
                    fontFamily: "serif",
                    color: "blue",
                  }}
                  // onClick={() => window.open(pdfFilePath, "_blank")}
                  download="resume"
                >
                  <img src={resumeIcon} width={60} height={50} alt="..." />{" "}
                  RESUME
                  <hr style={{ borderWidth: "3px" }} />
                </div>
                <div
                  className="col-12 text-center"
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    cursor: "pointer",
                    fontFamily: "serif",
                    color: "blue",
                  }}
                  // onClick={() => window.open(portfolioWebURL, "_blank")}
                >
                  <img src={webIcon} width={50} height={50} alt="..." />{" "}
                  Portfolio Website
                  <hr style={{ borderWidth: "3px" }} />
                </div>
                <div className="col-12">
                  <div className="container-fluid ">
                    <h3 className="text-center mb-4" style={{fontWeight:"bold", color:"brown"}}>Milestones <hr /></h3>
                    <Filters history={history}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-8"
            style={{ borderLeft: "1px solid grey", height: "auto" }}
          >
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <p style={{ fontSize: "30px", fontWeight: "bolder" }}>
                    {user.personalInfo[0].title}
                  </p>
                  <p>{user.personalInfo[0].bio}</p>
                  <hr style={{ borderWidth: "3px" }} />
                </div>
                <div
                  className="col-12"
                  style={{ fontSize: "30px", fontWeight: "bolder" }}
                >
                  Porfolio
                </div>
                <div className="col-12">
                  <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    onSlideChange={() => console.log("slide change")}
                    onSwiper={(swiper) => console.log(swiper)}
                  >
                    {projects.map((project) => {
                       var dateObj = new Date(project.completionDate);
                       var options = { year: 'numeric', month: 'short', day: 'numeric' };
                       var formattedDate = dateObj.toLocaleDateString('en-US', options);
                      return (
                        <SwiperSlide
                          className=" d-flex"
                          // onClick={() => window.open(portfolioWebURL, "_blank")}
                          style={{
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <h1 style={{ color: "green" }}>{project.title}</h1>
                          <div>
                            <span
                              style={{
                                fontSize: "10px",
                                fontWeight: "bold",
                                color: "red",
                              }}
                            >
                              Completion Date:
                            </span>{" "}
                            <span
                              style={{
                                fontSize: "10px",
                                fontWeight: "bolder",
                                color: "grey",
                              }}
                            >
                              {formattedDate}
                            </span>
                          </div>
                          <div
                            style={{
                              width: "500px",
                              height: "auto",
                              maxHeight: "100px",
                              overflow: "auto",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "blueviolet",
                              }}
                            >
                              Description:{" "}
                            </span>
                            <span
                              style={{
                                fontSize: "18px",
                              }}
                            >
                              {project.description}
                            </span>
                          </div>
                          <h5
                            className="text-center"
                            style={{
                              textDecoration: "underline",
                              color: "blue",
                            }}
                          >
                            Know more
                          </h5>
                          <div style={{ fontSize: "50px" }}>...</div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                  <hr style={{ borderWidth: "3px" }} />
                </div>
                <div className="col-12">
                  <p style={{ fontSize: "30px", fontWeight: "bolder" }}>
                    Skills
                  </p>
                  {skilled.map((skill) => {
                    return (
                      <span
                        style={{
                          margin: "5px",
                          padding: "5px",
                          borderRadius: "20px",
                          height: "auto",
                          backgroundColor: "green",
                          color: "white",
                          fontWeight: "bolder",
                        }}
                      >
                        {skill}
                      </span>
                    );
                  })}
                  <hr style={{ borderWidth: "3px" }} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <hr style={{ borderWidth: "3px" }} />
          </div>
          <div
            className="col-6"
            style={{ borderRight: "1px solid grey", height: "auto" }}
          >
            <div className="container-fluid">
              <div className="row">
                <div
                  className="col-12"
                  style={{ fontSize: "30px", fontWeight: "bolder" }}
                >
                  Certification
                </div>
                {certificates && (
                  <>
                    {certificates.map((certificate) => {
                       var dateObj = new Date(certificate.completionDate);
                       var options = { year: 'numeric', month: 'short', day: 'numeric' };
                       var formattedDate = dateObj.toLocaleDateString('en-US', options);
                      return (
                        <div className="col-12 mt-3 p-4 normal-box">
                          <div
                            style={{
                              cursor: "pointer",
                              fontSize: "16px",
                              fontWeight: "bolder",
                              textDecoration: "underline",
                            }}
                          >
                            {certificate.title}
                            <span style={{ float: "right" }}>
                              By: {certificate.provider}
                            </span>
                          </div>
                          <div>
                            <span
                              style={{
                                fontSize: "10px",
                                fontWeight: "bold",
                                color: "red",
                              }}
                            >
                              Completion Date:
                            </span>{" "}
                            <span
                              style={{
                                fontSize: "10px",
                                fontWeight: "bolder",
                                color: "grey",
                              }}
                            >
                              {formattedDate}
                            </span>{" "}
                            <br />
                            <span
                              style={{
                                float: "right",
                                textDecoration: "underline",
                                fontWeight: "bold",
                                color: "blue",
                                cursor: "pointer",
                              }}
                            >
                              View
                            </span>
                          </div>
                          <div>
                            Certificate ID: {certificate.certificationID}
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="container-fluid">
              <div className="row">
                <div
                  className="col-12"
                  style={{ fontSize: "30px", fontWeight: "bolder" }}
                >
                  Achievements
                </div>
                {achievements && (
                  <>
                    {achievements.map((achievement) => {
                       var dateObj = new Date(achievement.completionDate);
                       var options = { year: 'numeric', month: 'short', day: 'numeric' };
                       var formattedDate = dateObj.toLocaleDateString('en-US', options);
                      return (
                        <div className="col-12 mt-3 p-3 normal-box">
                          <div
                            style={{
                              fontSize: "16px",
                              fontWeight: "bolder",
                            }}
                          >
                            {achievement.title} <br />
                          </div>
                          <div>
                            <span
                              style={{
                                fontSize: "10px",
                                fontWeight: "bold",
                                color: "red",
                              }}
                            >
                              Date:
                            </span>{" "}
                            <span
                              style={{
                                fontSize: "10px",
                                fontWeight: "bolder",
                                color: "grey",
                              }}
                            >
                              {formattedDate}
                            </span>
                          </div>
                          <div>{achievement.description}</div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
