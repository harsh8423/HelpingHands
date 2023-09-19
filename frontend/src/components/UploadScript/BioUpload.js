import React, { useContext, useState } from "react";
import ContextApi from "../../ApiAndComponent/ContextApi";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import logoIcon from "../../images/Screenshot_2023-08-09_143330-transformed-transformed.png";

export default function BioUpload(props) {
  const a = useContext(ContextApi);
  let navigate = useNavigate();

  const [credentials, setcredentials] = useState({
    title: "",
    bio: "",
  });

  const { PageState } = props;
  console.log(PageState)

  const postBio = async (e) => {
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
      console.log("saved");
      toast.success("Bio Saved successfully!");
      setTimeout(() => {
        navigate("../BuildProfile");
      }, 2000);
    }

    if (!json.success) {
      toast.error("Credentials Missing");
    }
  };
  const onChangeHander = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Toaster toastOptions={{ duration: 4000 }} />
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
          <button
            type="submit"
            style={{ position: "absolute", right: "20px", bottom: "20px" }}
            className="button-55"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
