import React from "react";
import "../css/LoginCss.css"
import Navbar from "../ApiAndComponent/Navbar";
import logoIcon from "../images/Screenshot_2023-08-09_143330-transformed-transformed.png";
// import { Link } from "react-router-dom";

// import pppt1 from "../homeimages/adaade6657cec5c8e906c6705fb064ff-1.jpg";
// import pppt2 from "../homeimages/adaade6657cec5c8e906c6705fb064ff-2.jpg";
// import pppt3 from "../homeimages/adaade6657cec5c8e906c6705fb064ff-3.jpg";
// import pppt4 from "../homeimages/adaade6657cec5c8e906c6705fb064ff-4.jpg";
// import pppt5 from "../homeimages/adaade6657cec5c8e906c6705fb064ff-5.jpg";
// import pppt6 from "../homeimages/adaade6657cec5c8e906c6705fb064ff-6.jpg";
// import pppt7 from "../homeimages/adaade6657cec5c8e906c6705fb064ff-7.jpg";
// import pppt8 from "../homeimages/adaade6657cec5c8e906c6705fb064ff-8.jpg";


export default function Home() {

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-center">
            <img src={logoIcon} width={300} height={150} alt="..." />
            <p style={{ color: "green", fontWeight: "bolder" }}>
              LET'S MAKE IT
            </p>
          </div>
          {/* <div className="col-12 p-4 text-center">
            <button className="button-07 ">
            <Link className="nav-link" to="/Login">
                LOGIN
              </Link>
            </button>
          </div> */}
        </div>
      </div>
      {/* <div className="container-fluid text-center normal-box">
        {" "}
        <img src={pppt1} width={1500} height={800} alt="..." />
        <img src={pppt2} width={1500} height={800} alt="..." />
        <img src={pppt3} width={1500} height={800} alt="..." />
        <img src={pppt4} width={1500} height={800} alt="..." />
        <img src={pppt5} width={1500} height={800} alt="..." />
        <img src={pppt6} width={1500} height={800} alt="..." />
        <img src={pppt7} width={1500} height={800} alt="..." />
        <img src={pppt8} width={1500} height={800} alt="..." />
      </div> */}
      {/* <div className="col-12 p-4 text-center">
            <button className="button-07 ">
            <Link className="nav-link" to="/Login">
                LOGIN
              </Link>
            </button>
          </div> */}
    </>
  );
}
