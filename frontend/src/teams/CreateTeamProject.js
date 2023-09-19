import React,{useState,useContext} from 'react'
import ContextApi from "../ApiAndComponent/ContextApi";
import { toast, Toaster } from "react-hot-toast";
import "../css/LoginCss.css";

export default function CreateTeam() {

    const a = useContext(ContextApi);

  const createteam = async(e)=>{
    console.log(credentials.deadline)
    e.preventDefault()
    const response = await fetch("http://localhost:5000/api/CreateTeamProject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: a.user.team.teamID,
        title:credentials.title,
        description: credentials.description,
        deadline:credentials.deadline
        
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      toast.success("Project created successfully");
    }

    if (!json.success) {
      toast.error("Something went wrong");
    }
  }
  const [credentials, setcredentials] = useState({
    title: "",
    description: "",
    deadline: "",
  });
  const onChangeHander = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="container mt-3">
        <h2>Create Team</h2>
        <hr style={{ borderWidth: "2px", color: "grey" }} />
        <div className="row">
          <div className="col-12 text-center">
            <form onSubmit={createteam}
              className=" "
              style={{ border: "1px solid grey", borderRadius: "8px" }}
            >
              <div className="text-center mt-4">
                      <label htmlFor="teamName"></label>
                      <input
                        className="text-center m-1 button-6"
                        type="text"
                        name="title"
                        placeholder="Project Title"
                        value={credentials.title}
                        onChange={onChangeHander}
                        required
                      />
                    </div>
              <label htmlFor="moto"></label>
              <textarea
                className="text-center m-1 button-6"
                rows="6"
                cols="60"
                name="description"
                placeholder="Write about your Project [Description]"
                value={credentials.description}
                onChange={onChangeHander}
                required
              />
              <div>
            <label htmlFor="deadline">Completion Deadline: {" "}</label>
            <input
              type="date"
              required
              name="deadline"
              value={credentials.deadline}
              onChange={onChangeHander}
              min={new Date().toISOString().split("T")[0]}
            ></input>
          </div>
              <button
              type="submit"
                style={{
                  position: "absolute",
                  right: "20px",
                  bottom: "20px",
                }}
                className="button-55"
              >
                Post Project
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
