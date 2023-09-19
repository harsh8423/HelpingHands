import React, { useContext, useState, useEffect } from "react";
import UserNavbar from "../ApiAndComponent/UserNavbar";
import { useNavigate } from "react-router-dom";
import ContextApi from "../ApiAndComponent/ContextApi";
import { toast, Toaster } from "react-hot-toast";
import "../css/LoginCss.css";
import HomeBanner from "../ApiAndComponent/HomeBanner";
import saveIcon from "../images/ribbon.png";
import userIcon from "../images/user1.png";
import teamIcon from "../images/group.png";
import back from "../images/R.jpg";
import userback from "../images/OIP.jpg";
import HomeButtons from "../ApiAndComponent/HomeButtons";
import budgetIcon from "../images/money-bag.png";
import searchableNames from "../ApiAndComponent/SearchableNames";
import Select from "react-select";

export default function UserPage() {
  const a = useContext(ContextApi);
  const id = a.user._id;
  let navigate = useNavigate();

  const handleProfilePage = () => {
    navigate("../UserProfilePage");
  };

  const [projects, setprojects] = useState([]);

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

  const ProjectProposal = (id) => {
    navigate("../ProjectProposal", { state: id });
  };

  const handleSkills = async (searchableName) => {
    const pid = searchableName.value;
    if (pid !== id) {
      const response = await fetch("http://localhost:5000/api/profileView", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: pid,
        }),
      });
      const json = await response.json();

      if (!json.success) {
        console.log("Something Went Wrong Try Again");
      }
      if (json.success) {
        const user = json.userData;
        console.log("userData");
        console.log(user);
        navigate("../PublicViewProfilePage", { state: user });
      }
    }
  };

  const handlemessage = () => {
    navigate("../ChatRoom");
  };

  // code to filter

  const query = {};

  const handleproposalType = (e) => {
    query.proposalType = e.target.value;
    handlefilter();
    console.log(query);
  };
  const handleprojectType = (e) => {
    query.projectType = e.target.value;
    handlefilter();
    console.log(query);
  };
  const handlebudget = (e) => {
    query.budget = e.target.value;
    handlefilter();
    console.log(query);
  };
  const handleexpLevel = (e) => {
    query.expLevel = e.target.value;
    handlefilter();
  };
  const handleprojctLength = (e) => {
    query.projctLength = e.target.value;
    handlefilter();
  };

  const handlefilter = async (e) => {
    const response = await fetch("http://localhost:5000/api/filterProject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    });
    const json = await response.json();

    if (!json.success) {
      toast.error("Didn't got the filter");
    }
    if (json.success) {
      const data = json.data;
      console.log("userData");
      console.log(data);
      setprojects(data);
    }
  };

  const x = () => {
    navigate("../ChatRoom");
    window.location.reload();
  };

 
  return (
    <div>
      <UserNavbar />
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="container-fluid">
        <HomeBanner />
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 mt-2">
            <div>
              <button
                className="button-07"
                style={{
                  width: "330px",
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "green",
                }}
              >
                {" "}
                <img src={budgetIcon} width={30} height={30} alt="..." />
                Credits | 4650
              </button>
            </div>
            <div
              className="container-fluid text-center normal-box p-3"
              style={{
                backgroundImage: `url(${userback})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div className="row">
                <div className="col-12" style={{ fontWeight: "bolder" }}>
                  <img
                    onClick={handleProfilePage}
                    src={userIcon}
                    width={60}
                    height={60}
                    alt="..."
                  />

                  <div
                    onClick={handleProfilePage}
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    {a.user.personalInfo[0].name}
                  </div>
                  {a.user.personalInfo[0].title}
                </div>
              </div>
            </div>
            <div className="container-fluid">
              <div className="row">
                <button
                  className="col-6 button-07"
                  onClick={() => {
                    navigate("../MyConnects");
                  }}
                  style={{ fontWeight: "bolder", fontSize: "15px" }}
                >
                  0 Connects
                </button>
                <button
                  className="col-6 button-07"
                  onClick={x}
                  style={{ fontWeight: "bolder", fontSize: "15px" }}
                >
                  Messages
                </button>
              </div>
            </div>

            <div className=" text-center col-12 mt-2 ">
              <Select
                placeholder="Search people or connects"
                styles={{ height: "10px", overflow: "auto" }}
                options={searchableNames}
                isSearchable
                onChange={(searchableName) => handleSkills(searchableName)}
              />
            </div>
            <div
              className="container-fluid normal-box mt-2 p-3"
              style={{
                backgroundImage: `url(${back})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div className="row">
                <div className="col-3">
                  <img
                    onClick={handleProfilePage}
                    src={teamIcon}
                    width={60}
                    height={60}
                    alt="..."
                  />
                </div>
                <div onClick={a.user.team? (()=>{ navigate("../TeamRoom")}):(()=>{navigate("../TeamRequests")})} className="col-9 mt-3">
                  <h4 style={{ fontFamily: "cursive", fontWeight: "bold" }}>
                    {!a.user.team ? (
                      <div>
                        <button
                          className="button-6"
                          style={{ cursor: "pointer" }}
                          onClick={()=>{navigate("../TeamRequests")}}
                        >
                          Create Team
                        </button>
                      </div>
                    ):(
                      <span>{a.user.team.teamName}</span>

                    )
                  }
                  </h4>
                </div>
                <p
                  className="p-2 "
                  style={{ fontWeight: "bolder", color: "white" }}
                >
                  {a.user.team ? (
                    a.user.team.moto
                  ) : (
                    <>
                      Your team awaits – let's create something extraordinary
                      together!" <br />
                      Whole tean earns 1% when any one of your teammate complete
                      the job.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="col-9">
            <HomeButtons />
            <div className="col-12">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-10">
                    <div
                      className="container-fluid mt-5"
                      style={{
                        borderLeft: "2px solid lightgrey",
                        height: "auto",
                      }}
                    >
                      <h3>Projects you might like</h3>
                      <hr style={{ borderWidth: "3px" }} />
                      <div className="row">
                        {projects.map((project) => {
                          var skilled = project.skills;
                          var creater = project.creater;
                          console.log("skills: ", skilled);
                          if (creater != id) {
                            return (
                              <div
                                className="col-12 m-1 p-3 normal-box"
                                // style={{ border: "2px solid grey", borderRadius: "8px" }}
                              >
                                <h5>
                                  {project.title}
                                  <span
                                  className="normal-box"
                                    style={{
                                      float: "right",
                                      padding: "6px",
                                      height: "auto",
                                      backgroundColor: project.proposalType==="Team"? "red":"green",
                                      color: "white",
                                    }}
                                  >
                                    {project.proposalType}
                                  </span>
                                </h5>
                                <p>
                                  <small
                                    style={{
                                      fontWeight: "bold",
                                      color: "grey",
                                    }}
                                  >
                                    Experience Level: {project.expLevel} |
                                    Credits:
                                    {project.budget} | Est.Duration:
                                    {project.projectDuration}
                                  </small>
                                </p>
                                <p style={descriptionStyle}>
                                  {project.description}
                                </p>
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
                                  <small
                                    style={{
                                      fontWeight: "bold",
                                      color: "grey",
                                    }}
                                  >
                                    Teammate required: {project.projectType}{" "}
                                    <br />2 hours ago
                                  </small>

                                  <span style={{ float: "right" }}>
                                    <button
                                      className="button-07"
                                      onClick={() =>
                                        ProjectProposal(project._id)
                                      }
                                    >
                                      Apply
                                    </button>
                                  </span>
                                  <img
                                    className="mt-2"
                                    style={{
                                      float: "right",
                                      backgroundColor: "whitesmoke",
                                    }}
                                    src={saveIcon}
                                    width={30}
                                    height={30}
                                    alt="..."
                                  />
                                </p>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-2 mt-5"
                    style={{
                      borderLeft: "2px solid lightgrey",
                      height: "auto",
                    }}
                  >
                    <h3>Filters</h3>
                    <hr style={{ borderWidth: "3px" }} />
                    <div className="mt-2">
                      <span>
                        <input
                          type="checkbox"
                          name="proposalType"
                          value="Credit based"
                        />
                         {" "}
                        <label
                          style={{
                            fontSize: "16px",
                            fontWeight: "bolder",
                            textDecoration: "underline",
                          }}
                          htmlFor="css"
                        >
                          Only connects
                        </label>
                         {" "}
                      </span>
                      <br />
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: "bolder",
                          textDecoration: "underline",
                        }}
                      >
                        Project Type:
                      </p>
                      <span>
                        <input
                          type="radio"
                          name="proposalType"
                          value="Exchange"
                          onClick={handleproposalType}
                        />
                          <label htmlFor="proposalType">Exchange</label> {" "}
                      </span>
                      <br />
                      <span>
                        <input
                          type="radio"
                          name="proposalType"
                          value="Credit based"
                          onClick={handleproposalType}
                        />
                          <label htmlFor="proposalType">Credit based</label> {" "}
                      </span>
                    </div>
                    <div className="mt-2">
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: "bolder",
                          textDecoration: "underline",
                        }}
                      >
                        Credits:
                      </p>
                      <span>
                        <input
                          type="radio"
                          name="budget"
                          value="1000"
                          onClick={handlebudget}
                        />
                          <label htmlFor="budget">{"<"}1000</label> {" "}
                      </span>
                      <br />
                      <span>
                        <input
                          type="radio"
                          name="budget"
                          value="5000"
                          onClick={handlebudget}
                        />
                          <label htmlFor="budget">1001-5000</label> {" "}
                      </span>
                      <br />
                      <span>
                        <input
                          type="radio"
                          name="budget"
                          value="10000"
                          onClick={handlebudget}
                        />
                          <label htmlFor="budget">5001-10000</label> {" "}
                      </span>
                      <br />
                      <span>
                        <input
                          type="radio"
                          name="budget"
                          value="20000"
                          onClick={handlebudget}
                        />
                          <label htmlFor="budget">{">"}10000</label> {" "}
                      </span>
                    </div>
                    <div className="mt-2">
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: "bolder",
                          textDecoration: "underline",
                        }}
                      >
                        Experience Level:
                      </p>
                      <span>
                        <input
                          type="radio"
                          name="expLevel"
                          value="Beginner"
                          onClick={handleexpLevel}
                        />
                          <label htmlFor="expLevel">Beginner</label> {" "}
                      </span>
                      <br />
                      <span>
                        <input
                          type="radio"
                          name="expLevel"
                          value="Intermediate"
                          onClick={handleexpLevel}
                        />
                          <label htmlFor="expLevel">Intermediate</label> {" "}
                      </span>
                      <br />
                      <span>
                        <input
                          type="radio"
                          name="expLevel"
                          value="Expert"
                          onClick={handleexpLevel}
                        />
                          <label htmlFor="expLevel">Expert</label> {" "}
                      </span>
                    </div>
                    <div className="mt-2">
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: "bolder",
                          textDecoration: "underline",
                        }}
                      >
                        Project Length:
                      </p>
                      <span>
                        <input
                          type="radio"
                          name="projctLength"
                          value="Small"
                          onClick={handleprojctLength}
                        />
                          <label htmlFor="projctLength">Small</label> {" "}
                      </span>
                      <br />
                      <span>
                        <input
                          type="radio"
                          name="projctLength"
                          value="Medium"
                          onClick={handleprojctLength}
                        />
                          <label htmlFor="projctLength">Medium</label> {" "}
                      </span>
                      <br />
                      <span>
                        <input
                          type="radio"
                          name="projctLength"
                          value="Large"
                          onClick={handleprojctLength}
                        />
                          <label htmlFor="projctLength">Large</label> {" "}
                      </span>
                    </div>
                    <div className="mt-2">
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: "bolder",
                          textDecoration: "underline",
                        }}
                      >
                        Recruiting:
                      </p>
                      <span>
                        <input
                          type="radio"
                          name="projectType"
                          value="Single"
                          onClick={handleprojectType}
                        />
                          <label htmlFor="projectType">Single</label> {" "}
                      </span>
                      <br />
                      <span>
                        <input
                          type="radio"
                          name="projectType"
                          value="Multiple"
                          onClick={handleprojectType}
                        />
                          <label htmlFor="projectType">Multiple</label> {" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
