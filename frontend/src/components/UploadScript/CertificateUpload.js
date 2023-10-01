import React, { useState, useContext } from "react";
import ContextApi from "../../ApiAndComponent/ContextApi";
import { useNavigate } from "react-router-dom";
import logoIcon from "../../images/Screenshot_2023-08-09_143330-transformed-transformed.png";
import { toast, Toaster } from "react-hot-toast";

export default function CertificateUpload(props) {
    const a = useContext(ContextApi);
    let navigate = useNavigate();

  const { PageState } = props;

  const [credentials, setcredentials] = useState({
    title: "",
    completionDate: "",
    description: "",
    link: "",
    certificationID:"",
    provider:""
  });

  const onChangeHander = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };


  const postCertificate = async(e)=>{
    e.preventDefault();
    console.log(credentials);
    const response = await fetch("http://localhost:5000/api/postCertificate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: a.user._id,
        title: credentials.title,
        description: credentials.description,
        link: credentials.link,
        completionDate: credentials.completionDate,
        certificationID:credentials.certificationID,
        provider:credentials.provider
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      console.log("registered")
      toast.success("Certification added successfully!");
      setTimeout(() => {
        navigate("../BuildProfile");
      }, 2000);
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
              <Toaster toastOptions={{ duration: 4000 }} />

     
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
      <form onSubmit={postCertificate}>
      <div className="text-center mt-4">
        <label htmlFor="title"></label>
        <input
          className="text-center m-1 button-6"
          type="text"
          name="title"
          placeholder="Certificate Title"
          value={credentials.title}
          onChange={onChangeHander}
          required
        />
        <label htmlFor="link"></label>
        <input
          className="text-center m-1 button-6"
          type="text"
          name="link"
          placeholder="Certification URL"
          value={credentials.link}
          onChange={onChangeHander}
          required
        />
        <br />
        <label htmlFor="provider"></label>
        <input
          className="text-center m-1 button-6"
          type="text"
          name="provider"
          placeholder="Certificate provider"
          value={credentials.provider}
          onChange={onChangeHander}
          required
        /> <br />
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
      <label htmlFor="certificationID"></label>
        <input
          className="text-center m-1 button-6"
          type="text"
          name="certificationID"
          placeholder="certificationID"
          value={credentials.certificationID}
          onChange={onChangeHander}
          required
        />
        </div>
      <div className="text-center">
        <label htmlFor="description"></label>
        <textarea
          className="text-center m-1"
          rows="6"
          cols="auto"
          name="description"
          placeholder="certification Description . . . ."
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
