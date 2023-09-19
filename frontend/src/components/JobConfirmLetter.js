import React, { useState, useContext } from 'react'
import UserNavbar from "../components/UserNavbar"
import ContextApi from "../components/ContextApi";
import budgetIcon from "../images/money-bag.png";
import { useLocation } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

export default function JobConfirmLetter() {
    const a = useContext(ContextApi);
    const location = useLocation();
    const id = location.state;
    console.log("id.....", id)
    const [credentials, setcredentials] = useState({
        coverLetter: "",
        budget: 0,
      });

      const onChangeHander = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value });
      };
    

      const XpostProject = async (e) => {
        console.log(credentials);
        const response = await fetch("http://localhost:5000/api/JobConfirmLetter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectID: a.user._id,
            id: id,
            coverLetter: credentials.coverLetter,
            budget: credentials.budget,
          }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
          console.log("saved");
          toast.success("letter sucessfully sent");

        }
    
        if (!json.success) {
            // console.log("error in posting job")
          toast.error("Something went wrong");
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
        <UserNavbar/>
        <Toaster toastOptions={{ duration: 4000 }} />

        <div className="container mt-5">
        <h2>Project Proposal</h2>
        <hr style={{ borderWidth: "2px", color: "grey" }} />
        <div className="row">
          <div className="col-12 mt-5 text-center">
            <div
              style={{ border: "1px solid grey", borderRadius: "8px" }}
            >
              <h4 className="mt-5">
                Write all important information related to the project
              </h4>
              <label htmlFor="coverLetter"></label>
              <textarea
                className="text-center m-1 button-6"
                rows="20"
                cols="100"
                name="coverLetter"
                placeholder="Write About the confirmation Contract including Important Detail related to the Project"
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
              <span style={currencySymbolStyle}>Final Credits: </span>
              <input
                type="number"
                name="budget"
                style={inputStyle}
                onChange={onChangeHander}
                value={credentials.budget}
                placeholder="Enter Final Amount"
              />
              <button
              onClick={XpostProject}
                style={{
                  position: "absolute",
                  right: "20px",
                  bottom: "20px",
                }}
                className="button-55"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
          </div>
  )
}
