import React from "react";
import "../css/starCss.css";

export default function Filters(props) {
  const { history } = props;
  console.log("history", history);
  return (
    <div className="row">
      {history.map((hist) => {
        if (hist.projectLink) {
          var name = "Project";
        } else if (hist.provider) {
          var name = "Certification";
        } else {
          var name = "Achievement";
        }

        var dateObj = new Date(hist.completionDate);
        var options = { year: 'numeric', month: 'short', day: 'numeric' };
        var formattedDate = dateObj.toLocaleDateString('en-US', options);

        return (
          <>
            <div className="col-1 containerx" style={{ borderRight: "5px solid #e8deca", }}>
              <div class="circle"></div>
            </div>
            <div className="col-10">
              <p style={{lineHeight:0.8}}>
                <span style={{
                    fontSize: "14px",
                    fontWeight: "bolder",
                  }}>{name}</span>{" "}
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "bolder",
                    color: "blue",
                  }}
                >
                  {hist.title}
                </span> <br />
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    color: "green",
                  }}
                >
                  Completed
                </span>{" "}
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: "bolder",
                    color: "grey",
                  }}
                >
                  {formattedDate}
                </span> <br />

              </p>
            </div>
          </>
        );
      })}
    </div>
  );
}
