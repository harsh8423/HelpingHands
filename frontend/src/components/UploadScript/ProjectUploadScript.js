import React, { useState, useContext } from "react";
import ContextApi from "../../ApiAndComponent/ContextApi";

import skills from "../../screens/Skills";
import logoIcon from "../../images/Screenshot_2023-08-09_143330-transformed-transformed.png";
import Select from "react-select";
import { toast, Toaster } from "react-hot-toast";


export default function ProjectUploadScript(props) {
    const a = useContext(ContextApi);

  const { PageState } = props;

  const [skilled, setskilled] = useState([]);
  const [credentials, setcredentials] = useState({
    title: "",
    completionDate: "",
    description: "",
    projectLink: "",
  });

  const onChangeHander = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSkills = (skills) => {
    setskilled([]);
    skills.map((skill) => {
      setskilled([...skilled, skill.label]);
    });
  };

  const postProject = async(e)=>{
    e.preventDefault();
    console.log(credentials);
    const response = await fetch("http://localhost:5000/api/postProject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: a.user._id,
        title: credentials.title,
        description: credentials.description,
        projectLink: credentials.projectLink,
        completionDate: credentials.completionDate,
        skills:skilled
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      console.log("registered")
      toast.success("Project Saved successfully!");
    }

    if (!json.success) {
      toast.error("Credentials Missing");
    }
  }

  return (
    <div
      className="normal-box p-5 text-center"
      style={{
        height: "auto",
        width: "auto",
        minWidth: "300px",
        position: "relative",
      }}
    >
      <img
        style={{ position: "absolute", right: "0px", top: "-30px" }}
        src={logoIcon}
        width={160}
        height={60}
        alt="..."
      />
      <p
        style={{
          color: "green",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        {PageState}
      </p>
      <hr />
      <form onSubmit={postProject}>
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
        <label htmlFor="projectLink"></label>
        <input
          className="text-center m-1 button-6"
          type="text"
          name="projectLink"
          placeholder="Project URL"
          value={credentials.projectLink}
          onChange={onChangeHander}
          required
        />
        <br />
        <label htmlFor="completionDate" style={{ fontWeight: "bold" }}>
          Completion Date:{" "}
        </label>
        <input
          className="text-center m-3 button-6"
          type="date"
          name="completionDate"
          value={credentials.completionDate}
          onChange={onChangeHander}
          required
        />
      </div>
      <div className="text-center">
        <Select
          placeholder="Skills deliverable....."
          styles={{ height: "10px", overflow: "auto" }}
          options={skills}
          isMulti
          onChange={(skills) => handleSkills(skills)}
        />
        <br />
        <label htmlFor="description"></label>
        <textarea
          className="text-center m-1 button-6"
          rows="3"
          cols="30"
          name="description"
          placeholder="Project Description . . . ."
          value={credentials.description}
          onChange={onChangeHander}
          required
        />
        <button type="submit" style={{position:"absolute",right:"20px", bottom:"20px"}} className="button-55">Post</button>
      </div>
      </form>
    </div>
  );
}
