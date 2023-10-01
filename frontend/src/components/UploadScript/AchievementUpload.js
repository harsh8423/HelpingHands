import React, { useContext,useState } from "react";
import ContextApi from "../../ApiAndComponent/ContextApi";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import logoIcon from "../../images/Screenshot_2023-08-09_143330-transformed-transformed.png";


export default function AchievementUpload(props) {
  const a = useContext(ContextApi);
  let navigate = useNavigate();

  const { PageState } = props;

  const [credentials, setcredentials] = useState({
    title: "",
    completionDate: "",
    description: "",
    completionDate:""
  });


  const postAchievement = async (e) => {
    e.preventDefault();
    console.log(credentials);
    const response = await fetch("http://localhost:5000/api/postAchievement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: a.user._id,
        title: credentials.title,
        description: credentials.description,
        completionDate:credentials.completionDate,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      console.log("saved");
      toast.success("Achievement Saved successfully!");
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
          {PageState? `${PageState}`:""}
        </p>
        <hr />
        <form onSubmit={postAchievement}>
          <div className="text-center mt-4">
            <label htmlFor="title"></label>
            <input
              className="text-center m-1 button-6"
              name="title"
              placeholder="Achievement Title"
              value={credentials.title}
              onChange={onChangeHander}
              required
            />{" "}
            <br />
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
            <label htmlFor="description"></label>
            <textarea
              className="text-center m-1 button-6"
              rows="auto"
              cols="auto"
              name="description"
              placeholder="Write few words about the achievement you have got. . . ."
              value={credentials.description}
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
