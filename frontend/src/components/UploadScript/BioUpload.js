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
    const response = await fetch("https://helping-hands-api.vercel.app/api/postBio", {
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
            <input
              className="text-center m-1 button-6"
              name="title"
              
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
              rows="auto"
              cols="auto"
              name="bio"
              placeholder="Write About Yourself What you want tell to your Clients . . . ."
              value={credentials.bio}
              onChange={onChangeHander}
              required
            />
          </div>
          <button
            type="submit"
            className="button-55"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
