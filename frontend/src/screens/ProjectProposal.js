import React, { useState, useContext } from "react";
import ContextApi from "../ApiAndComponent/ContextApi";
import { useLocation } from "react-router-dom";
import UserNavbar from "../ApiAndComponent/UserNavbar";
import budgetIcon from "../images/money-bag.png";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ProjectProposal() {
  const a = useContext(ContextApi);
  let navigate = useNavigate();

  const location = useLocation();
  const id = location.state;

  const [credentials, setcredentials] = useState({
    coverLetter: "",
    budget: 0,
  });

  const onChangeHander = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const postProject = async (e) => {
    e.preventDefault()
    console.log(credentials);
    console.log("calling api")
    const response = await fetch("https://helping-hands-api.vercel.app/api/ProjectProposal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        proposalID: a.user._id,
        coverLetter: credentials.coverLetter,
        budget: credentials.budget,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      console.log("saved");
      toast.success("applied succesfully")
      setTimeout(() => {
        navigate("../UserPage")
      }, 2000);
    
    }

    if (!json.success) {
        console.log("error in posting job")
    //   toast.error("Credentials Missing");
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
      <UserNavbar />
      <Toaster toastOptions={{ duration: 4000 }} />

      <div className="container mt-5">
        <h2>Project Proposal</h2>
        <hr style={{ borderWidth: "2px", color: "grey" }} />
        <div className="row">
          <div className="col-12 mt-5 text-center">
            <form onSubmit={postProject}
              className=" "
              style={{ border: "1px solid grey", borderRadius: "8px" }}
            >
              <h4 className="mt-5">
                Write an Introductory cover letter for your proposal
              </h4>
              <label htmlFor="coverLetter"></label>
              <textarea
                className="text-center m-1 button-6"
                rows="20"
                cols="30"
                name="coverLetter"
                placeholder="Write About the project Contract including Important Detail related to the Project"
                value={credentials.coverLetter}
                onChange={onChangeHander}
                required
              />
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "green",
                }}
              >
                Set your Project Bid
              </p>
              <img src={budgetIcon} width={60} height={60} alt="..." />
              <span style={currencySymbolStyle}>Credits: </span>
              <input
                type="number"
                name="budget"
                style={inputStyle}
                onChange={onChangeHander}
                value={credentials.budget}
                placeholder="Enter Amount"
              />
              <button
              type="submit"
                style={{
                  position: "absolute",
                  right: "20px",
                  bottom: "20px",
                }}
                className="button-55"
              >
                Apply
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
