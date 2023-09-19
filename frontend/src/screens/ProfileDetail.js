import React, { useState,useContext } from "react";
import "../css/LoginCss.css";
import ContextApi from "../ApiAndComponent/ContextApi";
import ProjectUploadScript from "../components/UploadScript/ProjectUploadScript";

import logoIcon from "../images/Screenshot_2023-08-09_143330-transformed-transformed.png";
import ResumeUploadScript from "../components/UploadScript/ResumeUploadScript";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";



export default function ProfileDetail() {

  const a = useContext(ContextApi);
  let navigate = useNavigate();


  const [porfoliowebURL, setporfoliowebURL] = useState("")
  const [PageState, setPageState] = useState(
    "Give The Detail That Can Deascribe You Best"
  );

  const [credentials, setcredentials] = useState({
    title: "",
    bio: "",
  });
  const onChangeHander = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };


  const handleNextButton = () => {
    if (PageState === "Give The Detail That Can Deascribe You Best") {
      setPageState("Add Project To Your Portfolio");
    } else if (PageState === "Add Project To Your Portfolio") {
      setPageState("What title and identity you want to give to yourself");
    } else {
      navigate("../UserProfilePage")
    }
  };

  const postBio = async(e)=>{
    e.preventDefault();
    console.log(credentials);
    const response = await fetch("http://localhost:5000/api/postBio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: a.user._id,
        title: credentials.title,
        bio: credentials.bio,
        
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      console.log("saved")
      toast.success("Bio Saved successfully!");
      setTimeout(() => {
        navigate("../UserProfilePage")
      },2000);
    }

    if (!json.success) {
      toast.error("Credentials Missing");
    }
  }

  const handleportfolioWebsiteURL = async (e) => {
    console.log(porfoliowebURL)
    const response = await fetch("http://localhost:5000/api/portfolioWebsiteURL", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: a.user._id,
        portfolioWebsiteURL: porfoliowebURL
        
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      toast.success("Saved successfully!");

      // navigate("../MobileOTP");
    }

    if (!json.success) {
      toast.error("Invalid credentials");
    }
  };

const handleurlchange= (e)=>{
  setporfoliowebURL(e.target.value)
}

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
            <h3 style={{ color: "green" }}>PROFILE DETAILS</h3>
            <div>
              <small style={{ fontWeight: "bold", left: "0px", color: "grey" }}>
                {" "}
                STEP 1 of 5
              </small>
            </div>
            {PageState === "Give The Detail That Can Deascribe You Best" && (
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
                <ResumeUploadScript />
                <hr />
                <div className="m-3 text-center">
                  <p style={{ fontWeight: "bold", color: "green" }}>
                    Add Your Portfolio Website Link
                  </p>
                  <input type="text" value={porfoliowebURL} onChange={handleurlchange} className="button-6" />
                  <button className="button-6" onClick={handleportfolioWebsiteURL}> Add Link</button>
                </div>
                <hr />
                <button
                  className="button-6"
                  onClick={handleNextButton}
                  style={{
                    borderRadius: "30px",
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  Add details manually&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                  <small>
                    <small>[ you can upload it later ]</small>
                  </small>
                </button>
              </div>
            )}
            {PageState === "Add Project To Your Portfolio" && (
              <ProjectUploadScript PageState={PageState}/>
            )}
            {PageState === "What title and identity you want to give to yourself" && (
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
                <form onSubmit={postBio}>
                <div className="text-center mt-4">
                  <label htmlFor="title"></label>
                  <textarea
                    className="text-center m-1 button-6"
                    name="title"
                    rows="1"
                    cols="50"
                    placeholder="Give Title  to your Work Proffesion"
                    value={credentials.title}
                    onChange={onChangeHander}
                    required
                  />
                </div>
                <div className="text-center">
                  <label htmlFor="bio"></label>
                  <textarea
                    className="text-center m-1 button-6"
                    rows="6"
                    cols="60"
                    name="bio"
                    placeholder="Write About Yourself What you want tell to your Clients . . . ."
                    value={credentials.bio}
                    onChange={onChangeHander}
                    required
                  />
                </div>
                <button type="submit" style={{position:"absolute",right:"20px", bottom:"20px"}} className="button-55">Post</button>
                </form>
              </div>
            )}
            <button className="button-6"  onClick={handleNextButton} >
              SKIP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
