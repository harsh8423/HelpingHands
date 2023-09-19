import React, { useContext } from "react";
import UserNavbar from "../components/UserNavbar";
import ContextApi from "../components/ContextApi";
import userIcon from "../images/user.png";
import resumeIcon from "../images/icons8-resume-64.png";
import webIcon from "../images/icons8-website-94.png";
import skills from "./Skills";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import teamIcon from "../images/group.png";
import back from "../images/R.jpg";

// Import Swiper styles
import "swiper/css";
import { Navigate } from "react-router-dom";

export default function UserProfilePage() {
  const a = useContext(ContextApi);
  let navigate = useNavigate();
  const certificates = a.user.certifications;
  const achievements = a.user.achievements;
  console.log(certificates);

  const filepath = a.user.details.resumeFile;
  const web = a.user.details.portfolioWebsiteURL;
  const skilled = a.user.skills;
  const projects = a.user.projects;
  const portfolioWebURL = `${web}`;
  const pdfFilePath = require(`./Uploads/${filepath}`);

  const handlepostjob = () => {
    console.log("object");
    navigate("../PostJob");
  };
  return (
    <div>
      <UserNavbar />
      <div
        className="container mt-5  p-4"
        style={{ border: "1px solid grey", borderRadius: "8px" }}
      >
        <div className="row">
          <div className="col-12">
            <div className="container m-5">
              <div className="row">
                <div className="col-1">
                  <img src={userIcon} width={100} height={60} alt="..." />
                </div>
                <div className="col-6">
                  <div style={{ fontSize: "30px", fontWeight: "bold" }}>
                    {a.user.personalInfo[0].name}
                  </div>
                  <span
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
                    + connect
                  </span>
                  <span
                    className="col-2 text-center"
                    style={{
                      margin: "5px",
                      borderRadius: "20px",
                      cursor: "pointer",
                      height: "30px",
                      backgroundColor: "aqua",
                      fontWeight: "bold",
                    }}
                  >
                    Messages
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
                          My Team
                        </h4>
                      </div>
                      <p
                        className=""
                        style={{ fontWeight: "bolder", color: "white" }}
                      >
                        Your team awaits – let's create something extraordinary
                        together!"
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
                  onClick={() => window.open(pdfFilePath, "_blank")}
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
                  onClick={() => window.open(portfolioWebURL, "_blank")}
                >
                  <img src={webIcon} width={50} height={50} alt="..." />{" "}
                  Portfolio Website
                  <hr style={{ borderWidth: "3px" }} />
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
                    {a.user.personalInfo[0].title}
                  </p>
                  <p>{a.user.personalInfo[0].bio}</p>
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
                      return (
                        <SwiperSlide
                          className=" d-flex"
                          onClick={() => window.open(portfolioWebURL, "_blank")}
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
                              {project.completionDate}
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
                            <span style={{float:"right"}}>By:{" "}{certificate.provider}</span>
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
                              {certificate.completionDate}
                            </span> <br />
                            <span style={{float:"right", textDecoration:"underline", fontWeight:"bold",}}>View</span>
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
                              {achievement.completionDate}
                            </span>
                          </div>
                          <div>
                            {achievement.description}
                          </div>
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
