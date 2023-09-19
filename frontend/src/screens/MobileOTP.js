import logoIcon from "../images/Screenshot_2023-08-09_143330-transformed-transformed.png";
import React, { useState } from "react";

import firebase from "./firebase.config";
import { toast, Toaster } from "react-hot-toast";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import OtpInput from "otp-input-react";
import "../css/LoginCss.css";

import otpIcon from "../images/Screenshot_2023-08-13_181553-transformed-transformed.png";
import { useNavigate } from "react-router-dom";
import searchableNames from "./SearchableNames";

export default function MobileOTP(props) {
  let navigate = useNavigate();

  const {state, Email}= props

  console.log(state,Email)

  const [otpsent, setotpsent] = useState("false")
  const [otp, setotp] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  const saveMobileNumber = async (e) => {
    const response = await fetch("http://localhost:5000/api/saveMobileNumber", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobileNumber: phoneNumber,
        email:Email
      }),
    });
    const json = await response.json();

    console.log("save number:", json)

    if (json.success) {
      console.log("verifying otp")
      verifyOtp()
    }

    if (!json.success) {
      console.log("number save failed")
      toast.error("Check your Internet Connection");
    }
  };


  const verifyPhone = async()=>{
    const response = await fetch("http://localhost:5000/api/verifyPhone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
      }),
    });
    const json = await response.json();

    console.log("verify phone", json)

    if(state==="signup"){
      if(!json.success){
        //register mobile number api...
        console.log("signup state saving the number")
        saveMobileNumber()
      }else{
        toast.error("Mobile Number already Registered");
      }
    }

    if (state==="signin") {
      if(json.success){
        console.log("signin state verifying otp")
        verifyOtp()
      }
    }
  }

  const verifyOtp = async() =>{
    configureCaptcha();
      // const phoneNumber = "+91" + this.state.mobile;
      console.log(phoneNumber);
      const appVerifier = window.recaptchaVerifier;
      firebase
        .auth()
        .signInWithPhoneNumber("+" + phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          console.log("OTP has been sent");
          toast.success("OTP sent successfully!");
          setotpsent("true")
  
          // ...
        })
        .catch((error) => {
          // Error; SMS not sent
          // ...
          toast.error("Please check your Mobile Number or Internet");
        });
  }
  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
          console.log("Recaptca varified");
        },
        defaultCountry: "IN",
      }
    );
  };
  const onSignInSubmit = (e) => {
      e.preventDefault()
      // verifyOtp();
      verifyPhone()
    
  };
  const onSubmitOTP = (e) => {
    e.preventDefault();
    const code = otp;
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user);
        //   console.log(JSON.stringify(user))
        toast.success("OTP Verified");
        handleMobileLogin();
        // ...
      })
      .catch((error) => {
        toast.error("Invalid OTP");

        // User couldn't sign in (bad verification code?)
        // ...
      });
  };

  const handleMobileLogin = async (e) => {
    const response = await fetch("http://localhost:5000/api/MobileLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobileNumber: phoneNumber
      }),
    });
    const json = await response.json();

    if (!json.success) {
      toast.error("Something Went Wrong Try Again");
    }
    if (json.success) {
      toast.success("Login successful");

      const userData = json.userData;
      console.log("userData");
      console.log(userData);
      // contextStat.setuser(userData);
      const authtoken = json.authToken;
      console.log(authtoken);
      const data = { 
        label: `${userData.personalInfo[0].name}, ${userData.personalInfo[0].title} `, 
        value: userData._id
      }
      searchableNames.push(data);

      localStorage.setItem("authToken", json.authToken);
      // console.log(localStorage.getItem("authToken"))
      localStorage.setItem("userData", JSON.stringify(userData));

      if(state==="signup"){
        navigate("../ProfileDetail")
      }
      if(state==="signin"){
        setTimeout(() => {
          navigate("../UserPage")
          
        }, 2000);
      }
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "wheatsmoke", height: "100vh" }}
    >
      <div className="row">
        <div
          className="col-12 normal-box "
          style={{
            flexDirection: "column",
            width: "auto",
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
          <img
            style={{ padding: "40px" }}
            src={otpIcon}
            width={330}
            height={230}
            alt="..."
          />

          <Toaster toastOptions={{ duration: 4000 }} />

          <p
            className="text-center"
            style={{ fontSize: "20px", fontWeight: "bold" }}
          >
            OTP Verification
          </p>
          {otpsent==="false"&& (<>
          <div style={{fontWeight:"bolder"}} className="text-center">Please enter your Mobile Number to get an OTP</div>
            <form className="mt-3" onSubmit={onSignInSubmit}>
            <div id="sign-in-button"></div>
            <PhoneInput
              country={"in"}
              value={phoneNumber}
              onChange={setphoneNumber}
            />
            <div className="text-center mt-3 mb-3">
              <button className="button-07" type="submit">
                Send OTP
              </button>
            </div>
          </form>
          </>)}

          {otpsent==="true"&& (<>
            <div style={{fontWeight:"bolder"}} className="text-center">Please enter the OTP sent to your <br/> Mobile Number +{phoneNumber}</div>

            <form className="mt-3" onSubmit={onSubmitOTP}>
            <label style={{fontWeight:"bold"}} htmlFor="otp">Enter your OTP</label>
            <OtpInput
              value={otp}
              onChange={setotp}
              OTPLength={6}
              otpType="number"
              disabled={false}
              autoFocus
              className="opt-container "
            ></OtpInput>{" "}
            <div className="text-center mt-3 mb-3">
              <button className="button-07 " type="submit">
                Verify OTP
              </button>
            </div>
          </form>
          </>)}
        </div>
      </div>
    </div>
  );
}
