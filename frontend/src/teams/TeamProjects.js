import React from "react";
import { useNavigate } from "react-router-dom";

export default function TeamProjects(props) {
  const navigate = useNavigate();
  const currentTime = new Date().getTime();
  const { projects } = props;

  return (
    <div className="conatiner-fluid">
      <div className="row">
        {projects?.map((project) => {
          var deadlineTime = new Date(project.completionDate).getTime();
          var dateStamp = new Date(project.dateStamp).getTime();
          var postingDate = currentTime - dateStamp;
          var days = Math.floor(postingDate / (1000 * 60 * 60 * 24));
          var hours = Math.floor(
            (postingDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          var minutes = Math.floor(
            (postingDate % (1000 * 60 * 60)) / (1000 * 60)
          );

          var timeRemaining = `${days}d ${hours}h ${minutes}m ago`;
          if (hours < 1) {
            timeRemaining = `${minutes}min ago`;
          } else if (days < 1) {
            timeRemaining = `${hours}hr ago`;
          } else {
            timeRemaining = `${days}day ago`;
          }
          var timeLeft = deadlineTime - currentTime;
          var Xdays = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

          return (
            <div className="col-12 normal-box p-3">
              <h3>
                {project.title}{" "}
                <span
                  style={{
                    color: "red",
                    fontSize: "20px",
                    float: "right",
                    fontWeight: "bold",
                  }}
                >{`${Xdays} Days Left`}</span>{" "}
              </h3>
              {project.description}
              <div>
              <br />
                <span
                  style={{
                    margin: "4px",
                    padding: "5px",
                    borderRadius: "20px",
                    height: "auto",
                    backgroundColor: "lightgrey",
                  }}
                >
                  <small style={{ fontWeight: "bolder" }}>Harsh Tiwari</small>
                </span>
              </div>
              <br />
              <p>
                {" "}
                <span
                  style={{
                    color: "grey",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  {timeRemaining}
                </span>{" "}
                <button className="button-07 m-2" style={{ float: "right" }}>
                  Proposals
                </button>
                <button
                  className="button-07 m-2"
                  onClick={() => {
                    navigate("../PostJob", { state: "Team" });
                  }}
                  style={{ float: "right" }}
                >
                  Hire
                </button>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
