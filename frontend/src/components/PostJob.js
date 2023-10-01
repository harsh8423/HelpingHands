import React, { useState, useContext } from "react";
import "../css/LoginCss.css";
import ContextApi from "../ApiAndComponent/ContextApi";
import ProjectUploadScript from "../components/UploadScript/ProjectUploadScript";
import skills from "../screens/Skills";
import Select from "react-select";
import logoIcon from "../images/Screenshot_2023-08-09_143330-transformed-transformed.png";
import budgetIcon from "../images/money-bag.png";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function ProfileDetail() {
  const a = useContext(ContextApi);
  let navigate = useNavigate();
  const location = useLocation();
  const user = location?.state;

  const isMobile = window.innerWidth <= 700; // Adjust the breakpoint as needed


  var [PageState, setPageState] = useState(1);

  const [skilled, setskilled] = useState([]);
  const [credentials, setcredentials] = useState({
    title: "",
    proposalType: "",
    description: "",
    projectLength: "",
    expLevel: "",
    projectDuration: "",
    projectType: "",
    budget: 0,
  });

  const handleSkills = (skills) => {
    setskilled([]);
    skills.map((skill) => {
      setskilled([...skilled, skill.label]);
    });
  };

  const onChangeHander = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleNextButton = () => {
      if(PageState===4){
          postProject()
      }
    setPageState(PageState+1);
  };

  const postProject = async (e) => {
    console.log(credentials);
    console.log("calling api")
    const response = await fetch("http://localhost:5000/api/PostProject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        creater: a.user._id,
        title: credentials.title,
        skills: skilled,
        description: credentials.description,
        proposalType: user? "Team":credentials.proposalType,
        projectLength: credentials.projectLength,
        expLevel: credentials.expLevel,
        projectDuration: credentials.projectDuration,
        projectType: credentials.projectType,
        budget: credentials.budget,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      console.log("saved");
      toast.success("Project Posted successfully!");
      setTimeout(() => {
        navigate("../UserPage");
      }, 2000);
    }

    if (!json.success) {
      toast.error("Credentials Missing");
    }
  };

  const currencySymbolStyle = {
    fontSize: "20px",
    marginRight: "5px",
  };

  const inputStyle = {
    border: "none",
    outline: "none",
    fontSize: "18px",
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 p-5">
            <img src={logoIcon} width={160} height={60} alt="..." />
          </div>
          <Toaster toastOptions={{ duration: 4000 }} />
          <div
            className="col-12 d-flex justify-content-center align-items-center"
            style={{ flexDirection: "column" }}
          >
            <h3 style={{ color: "green" }}>PROJECT DETAILS</h3>
            <div>
              <small style={{ fontWeight: "bold", left: "0px", color: "grey" }}>
                {" "}
                STEP {PageState} of 4
              </small>
            </div>
            <div
              className="normal-box p-5 text-center"
              style={{
                height: "auto",
                width: isMobile? "100vw":"80vw",
                position: "relative",
              }}
            >
            
              <p
                style={{
                  color: "green",
                  fontSize: "2vmax",
                  fontWeight: "bold",
                }}
              >
                Tell Your Project Title and Skills required
              </p>
              <hr />
                {PageState === 1 && (
                  <>
                    <div className="text-center mt-4">
                      <label htmlFor="title"></label>
                      <input
                        className="text-center m-1 button-6"
                        type="text"
                        name="title"
                        placeholder="Project Title"
                        value={credentials.title}
                        onChange={onChangeHander}
                        required
                      />
                    </div>
                    <div className="text-center m-5">
                      <Select
                        placeholder="Skills deliverable....."
                        styles={{ height: "10px", overflow: "auto" }}
                        options={skills}
                        isMulti
                        isSearchable
                        onChange={(skills) => handleSkills(skills)}
                      />
                    </div>
                    <br />
                    {!user && <div className="text-center mt-4">
                      <p
                        style={{
                          fontSize: "1.7vmax",
                          fontWeight: "bold",
                          color: "green",
                        }}
                      >
                        Select the Type of Project you want to post
                      </p>
                      <span className="button-6 m-2">
                        <input
                          type="radio"
                          onChange={onChangeHander}
                          name="proposalType"
                          value="Exchange"
                        />
                          <label htmlFor="Exchange">Exchange</label> {" "}
                      </span>
                      <span className="button-6 m-2">
                        <input
                          type="radio"
                          onChange={onChangeHander}
                          name="proposalType"
                          value="Credit based"
                        />
                          <label htmlFor="css">Credit based</label> {" "}
                      </span>
                      <span className="button-6 m-2">
                        <input
                          type="radio"
                          onChange={onChangeHander}
                          name="proposalType"
                          value="Exchange or Credit"
                        />
                          <label htmlFor="javascript">both</label>
                      </span>
                    </div>}
                  </>
                )}
                {PageState === 2 && (
                  <>
                    <div className="text-center mt-4">
                      <p
                        style={{
                          fontSize: "1.7vmax",
                          fontWeight: "bold",
                          color: "green",
                        }}
                      >
                        Select the duration of your Project Work
                      </p>
                      <span className="button-6 m-2">
                        <input
                          type="radio"
                          onChange={onChangeHander}
                          name="projectLength"
                          value="Small"
                        />
                          <label htmlFor="Small">Small</label> {" "}
                      </span>
                      <span className="button-6 m-2">
                        <input
                          type="radio"
                          onChange={onChangeHander}
                          name="projectLength"
                          value="Medium"
                        />
                          <label htmlFor="css">Medium</label> {" "}
                      </span>
                      <span className="button-6 m-2">
                        <input
                          type="radio"
                          onChange={onChangeHander}
                          name="projectLength"
                          value="Large"
                        />
                          <label htmlFor="javascri">Large</label>
                      </span>
                    </div>
                    <div className="text-center mt-4">
                      <p
                        style={{
                          fontSize: "1.7vmax",
                          fontWeight: "bold",
                          color: "green",
                        }}
                      >
                        Select the Type of Teammates you want
                      </p>
                      <span className="button-6 m-2">
                        <input
                          type="radio"
                          onChange={onChangeHander}
                          name="expLevel"
                          value="Entry"
                        />
                          <label htmlFor="html">Entry</label> {" "}
                      </span>
                      <span className="button-6 m-2">
                        <input
                          onChange={onChangeHander}
                          type="radio"
                          name="expLevel"
                          value="Intermediate"
                        />
                          <label htmlFor="css">Intermediate</label> {" "}
                      </span>
                      <span className="button-6 m-2">
                        <input
                          type="radio"
                          onChange={onChangeHander}
                          name="expLevel"
                          value="Expert"
                        />
                          <label htmlFor="javascript">Expert</label>
                      </span>
                    </div>
                    <div className="text-center mt-4">
                      <label htmlFor="projectDuration"></label>
                      <textarea
                        className="text-center m-1 button-6"
                        name="projectDuration"
                        rows="auto"
                        cols="auto"
                        placeholder="Tell us the duration of your project... example: 10days"
                        value={credentials.projectDuration}
                        onChange={onChangeHander}
                        required
                      />
                    </div>
                  </>
                )}
                {PageState === 3 && (
                  <>
                    <div className="text-center">
                      <p
                        style={{
                          fontSize: "1.7vax",
                          fontWeight: "bold",
                          color: "green",
                        }}
                      >
                        Project Contract Description
                      </p>

                      <label htmlFor="description"></label>
                      <textarea
                        className="text-center m-1 "
                        width= "60vw"
                        height= "60vw"
                        name="description"
                        placeholder="Write About the project Contract including Important Detail related to the Project"
                        value={credentials.description}
                        onChange={onChangeHander}
                        required
                      />
                    </div>
                  </>
                )}
                {PageState >= 4 && (
                  <>
                    <div className="text-center mt-4">
                      <p
                        style={{
                          fontSize: "1.7vmax",
                          fontWeight: "bold",
                          color: "green",
                        }}
                      >
                        Select the Number of Teammates you want
                      </p>
                      <span className="button-6 m-2">
                        <input
                          type="radio"
                          onChange={onChangeHander}
                          name="projectType"
                          value="Single"
                        />
                          <label htmlFor="html">Single</label>
                      </span>
                      <span className="button-6 m-2">
                        <input
                          type="radio"
                          name="projectType"
                          onChange={onChangeHander}
                          value="Multiple"
                        />
                          <label htmlFor="css">Multiple</label>
                      </span>
                      <p
                        style={{
                          fontSize: "1.7vmax",
                          fontWeight: "bold",
                          color: "green",
                        }}
                      >
                        Set your Project budget
                      </p>
                      <img
                        src={budgetIcon}
                        width={60}
                        height={60}
                        alt="..."
                      />
                      <span style={currencySymbolStyle}>&#x20B9;</span>
                      <input
                        type="number"
                        name="budget"
                        style={inputStyle}
                        onChange={onChangeHander}
                        value={credentials.budget}
                        placeholder="Enter Amount"
                      />
                    </div>
                  </>
                )}
              <button
              onClick={handleNextButton}
              
              className="button-55"
            >
              Next
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
