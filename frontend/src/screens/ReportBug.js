import React, { useState, useContext } from "react";
import ContextApi from "../ApiAndComponent/ContextApi";
import UserNavbar from "../ApiAndComponent/UserNavbar";
import { toast, Toaster } from "react-hot-toast";


export default function ProjectUploadScript() {
    const a = useContext(ContextApi);
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    detail: "",
    location: "",
  });

  const onChangeHander = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

 
  const gotbug = async(e)=>{
    e.preventDefault();
    console.log(credentials);
    const response = await fetch("http://localhost:5000/api/gotbug", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id:a.user._id,
        name: credentials.name,
        detail: credentials.detail,
        email: credentials.email,
        location: credentials.location,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      console.log("bug reported")
      toast.success("Bug reported");
    }

    if (!json.success) {
      toast.error("Bug credentials Missing");
    }
  }

  return (
    <>
    <UserNavbar/>
    <div
      className="normal-box mt-5 p-5 text-center"
      style={{
        height: "auto",
        width: "100vw",
        // minWidth: "200px",
        position: "relative",
      }}
    >
      <div>
        <h1>Report Bug</h1>
      </div>
      <form onSubmit={gotbug}>
      <div className="text-center mt-4">
        <label htmlFor="name"></label>
        <input
          className="text-center m-1 button-6"
          type="text"
          name="name"
          placeholder="Your name"
          value={credentials.name}
          onChange={onChangeHander}
          required
        />
        <label htmlFor="email"></label>
        <input
          className="text-center m-1 button-6"
          type="text"
          name="email"
          placeholder="Your Email"
          value={credentials.email}
          onChange={onChangeHander}
          required
        />
        <br />
        <label htmlFor="location" style={{ fontWeight: "bold" }}>
        </label>
        <input
          className="text-center m-3 button-6"
          type="textarea"
          name="location"
          value={credentials.location}
          placeholder="where you found the bug"
          onChange={onChangeHander}
          required
        />
      </div>
      <div className="text-center">
        
        <label htmlFor="detail"></label>
        <textarea
          className="text-center m-1 button-6"
          rows="6"
          cols="auto"
          name="detail"
          placeholder="Problem Detail . . . ."
          value={credentials.detail}
          onChange={onChangeHander}
          required
        />
        <br />
        <button type="submit"  className="button-55">Report</button>
      </div>
      </form>
    </div>
    </>
  );
}
