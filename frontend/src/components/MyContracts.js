import React, { useContext, useEffect, useState } from "react";
import ContextApi from "./ContextApi";
import { toast, Toaster } from "react-hot-toast";
import "../css/LoginCss.css"
import { useNavigate } from "react-router-dom";
import Proposals from "./Proposals";


export default function MyContracts() {
  const a = useContext(ContextApi);
  let navigate = useNavigate();

  const [projects, setprojects] = useState([]);
  const [page, setpage] = useState("false")
  const [ID, setID] = useState("")

  const [descriptionStyle, setdescriptionStyle] = useState({
    height: "50px",
    overflow: "hidden",
  });

  const contract = async () => {
    const response = await fetch("http://localhost:5000/api/MyContracts", {
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

  const handleProposals = (id)=>{
    setpage("true")
    setID(id)
  }
  useEffect(() => {
    contract();
  }, []);

 

  return (
    <div>
        <Toaster toastOptions={{ duration: 4000 }} />
      <div className="container mt-5">
        <h2>My Contracts</h2>
        <hr style={{ borderWidth: "3px" }} />
        {page==="false"? (
          <div className="row">
          {projects.map((project) => {
            var skilled = project.skills;
            console.log("skills: ", skilled);
            return (
              <div
                className="col-5 m-5 p-3"
                style={{ border: "2px solid grey", borderRadius: "8px" }}
              >
                <h5>
                  {project.title}
                  <span
                    style={{
                      float: "right",
                      margin: "5px",
                      padding: "6px",
                      cursor: "pointer",
                      borderRadius: "20px",
                      height: "auto",
                      backgroundColor: "green",
                      color: "white",
                    }}
                  >
                    {project.proposalType}
                  </span>
                </h5>
                <p>
                  <small style={{ fontWeight: "bold", color: "grey" }}>
                    Experience Level: {project.expLevel} <br />
                    Est.budget(INR):{project.budget}{" "}{" "} Est.Duration:{project.projectDuration}
                  </small>
                </p>
                <p style={descriptionStyle}>{project.description}</p>
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
                      <small style={{ fontWeight: "bolder" }}>{skill}</small>
                    </span>
                  );
                })}
                <p className="mt-3">
                  <small style={{ fontWeight: "bold", color: "grey" }}>
                    Teammate required:{" "} {project.projectType} <br />
                    2 hours ago
                  </small>

                  <span style={{float:"right"}} ><button onClick={()=>handleProposals(project._id)} className="button-07">Proposals</button></span>
                </p>
              </div>
            );
          })}
        </div>
        ):(
          <Proposals id={ID}/>
        )}
      </div>
    </div>
  );
}
