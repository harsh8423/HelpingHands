import React,{useState,useContext} from 'react'
import ContextApi from "../ApiAndComponent/ContextApi";
import UserNavbar from "../ApiAndComponent/UserNavbar";
import { toast, Toaster } from "react-hot-toast";
import "../css/LoginCss.css";

export default function CreateTeam() {

    const a = useContext(ContextApi);

  const createteam = async(e)=>{
    e.preventDefault()
    const response = await fetch("http://localhost:5000/api/createTeam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: a.user._id,
        teamName:credentials.teamName,
        moto: credentials.moto
        
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      toast.success("Team created successfully");
    }

    if (!json.success) {
      toast.error("Something went wrong");
    }
  }
  const [credentials, setcredentials] = useState({
    teamName: "",
    moto: "",
  });
  const onChangeHander = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <UserNavbar />
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="container mt-5">
        <h2>Create Team</h2>
        <hr style={{ borderWidth: "2px", color: "grey" }} />
        <div className="row">
          <div className="col-12 mt-5 text-center">
            <form onSubmit={createteam}
              className=" "
              style={{ border: "1px solid grey", borderRadius: "8px" }}
            >
              <div className="text-center mt-4">
                      <label htmlFor="teamName"></label>
                      <input
                        className="text-center m-1 button-6"
                        type="text"
                        name="teamName"
                        placeholder="Team Name"
                        value={credentials.teamName}
                        onChange={onChangeHander}
                        required
                      />
                    </div>
              <label htmlFor="moto"></label>
              <textarea
                className="text-center m-1 button-6"
                rows="6"
                cols="60"
                name="moto"
                placeholder="Write about your team moto"
                value={credentials.moto}
                onChange={onChangeHander}
                required
              />
              <button
              type="submit"
                style={{
                  position: "absolute",
                  right: "20px",
                  bottom: "20px",
                }}
                className="button-55"
              >
                Create Team
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
