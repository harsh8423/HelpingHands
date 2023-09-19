import React, { useState, useContext } from "react";
import "../css/LoginCss.css";
import logoIcon from "../images/Screenshot_2023-08-09_143330-transformed-transformed.png";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import MobileOTP from "./MobileOTP";
import searchableNames from "../ApiAndComponent/SearchableNames";

import skills from "./Skills";

import Select from "react-select";


export default function Login() {
  let navigate = useNavigate();

  const LoginStyle = {
    width: "auto",
    height: "40px",
    borderRadius: "0px",
    boxShadow: "inset 0px 0px 25px 0px green",
    border: "none",
    outline: "none",
    color: "black",
    fontWeight: "bolder",
    backgroundColor: "transparent",
  };

  const handleNextButton = () => {
    navigate("../ProfileDetail");
  };
  const [otppage, setotppage] = useState("false")

  const [skilled, setskilled] = useState([])
  const [isSignUp, setIsSignUp] = useState(false);
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    educationLevel: "",
  });

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const onChangeHander = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(credentials);
    const response = await fetch("http://localhost:5000/api/CreateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        gender: credentials.gender,
        educationLevel: credentials.educationLevel,
        skills:skilled
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      console.log("registered")
      toast.success("Registered successfully!");
      setotppage("true")
    }

    if (!json.success) {
      toast.error("User already Resgistered");
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/LoginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    if (!json.success) {
      toast.error("Invalid Email or Password");
    }
    if (json.success) {
      toast.success("Login successful");

      const userData = json.userData;
      console.log("userData");
      console.log(userData);
      // contextStat.setuser(userData);
      const authtoken = json.authToken;
      console.log(authtoken);

      localStorage.setItem("authToken", json.authToken);
      // console.log(localStorage.getItem("authToken"))
      localStorage.setItem("userData", JSON.stringify(userData));

      setTimeout(() => {
        navigate("../UserPage")
      }, 2000);
    }
  };

  const handleotpclick = ()=>{
    setotppage("true")
    }

const handleSkills = (skills)=>{
  setskilled([])
  skills.map((skill)=>{
    setskilled([...skilled,skill.label])
  })
}

  return (
    <div>
      {otppage==="false"? (
        <div className="container-fluid">
        <div className="row">
          <div className="col-12 p-5">
            <img src={logoIcon} width={160} height={60} alt="..." />
          </div>
          <Toaster toastOptions={{ duration: 4000 }} />
          <div className="col-12 d-flex justify-content-center align-items-center">
            <div
              className="normal-box p-5"
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
              <form
                onSubmit={isSignUp ? handleSignUp : handleSignIn}
                className="text-center"
              >
                <p
                  style={{
                    color: "green",
                    fontSize: "30px",
                    fontWeight: "bold",
                  }}
                >
                  {isSignUp ? "SIGNUP" : "LOGIN"}
                </p>
                {isSignUp && (
                  <>
                    <div className="text-center">
                      <label htmlFor="name"></label>
                      <input
                        className="text-center m-1 button-55 "
                        style={LoginStyle}
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={credentials.name}
                        onChange={onChangeHander}
                        required
                      />
                      <label htmlFor="gender"></label>

                      <select
                        onChange={onChangeHander}
                        className="text-center borderR m-1 button-55"
                        style={LoginStyle}
                        name="gender"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="text-center">
                      <label htmlFor="educationLevel"></label>

                      <select
                        onChange={onChangeHander}
                        className="text-center m-1 button-55"
                        style={LoginStyle}
                        name="educationLevel"
                      >
                        <option value="">Education Level</option>
                        <option value="schooling">Schooling</option>
                        <option value="undergraduate">Undergraduate</option>
                        <option value="graduate">Graduate</option>
                        <option value="post graduate">Post Graduate</option>
                      </select>
                    </div>
                    <div className="text-center">
                      <Select
                      placeholder="Add Your Skills....."
                      styles={{height:"10px", overflow:"auto" }}
                        options={skills}
                        isMulti
                        onChange={(skills) => handleSkills(skills)}
                      />
                    </div>
                  </>
                )}
                <div className="text-center">
                  <label htmlFor="email"></label>
                  <input
                    className="text-center m-1 button-55"
                    style={LoginStyle}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={onChangeHander}
                    required
                  />
                </div>
                <div className="text-center">
                  <label htmlFor="password"></label>
                  <input
                    className="text-center m-1 button-55"
                    style={LoginStyle}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={onChangeHander}
                    required
                  />
                </div>
                <br />
                {isSignUp ? (
                  ""
                ) : (
                  <button type="submit" className="button-07">
                    Login
                  </button>
                )}
                <div>
                  <p>
                    {isSignUp ? (
                      <>
                        <br />
                        <span style={{ color: "green", fontWeight: "bold" }}>
                          Already have an account?{" "}
                        </span>
                        <span
                          style={{
                            cursor: "pointer",
                            color: "green",
                            textDecoration: "underline",
                          }}
                          onClick={handleSignInClick}
                        >
                          Sign In
                        </span>
                      </>
                    ) : (
                      <>
                        <br />
                        <span style={{ color: "green", fontWeight: "bold" }}>
                          Don't have an account?{" "}
                        </span>
                        <span
                          style={{
                            cursor: "pointer",
                            color: "green",
                            textDecoration: "underline",
                          }}
                          onClick={handleSignUpClick}
                        >
                          Sign Up
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </form>
              {isSignUp? "":(
                <div style={{fontWeight:"bold", color:"blue",textDecoration:"underline", cursor:"pointer"}} onClick={handleotpclick} className="text-center">
                  Login with Mobile OTP
                </div>
              )}
              {isSignUp && (
                <button
                  className="button-07 mb-5"
                  style={{
                    borderRadius: "25px",
                    width: "70px",
                    position: "absolute",
                    right: "10px",
                  }}
                  onClick={handleSignUp}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      ):(
        <MobileOTP state={isSignUp? "signup":"signin"} Email={credentials.email}/>
      )}
    </div>
  );
}
