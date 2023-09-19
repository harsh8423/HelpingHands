import React from "react";
import Navbar from "../components/Navbar";
import logoIcon from "../images/Screenshot_2023-08-09_143330-transformed-transformed.png";

export default function home() {
  return (<>
        <Navbar/>
      <div className="container-fluid">
      <div className="row">
        <div className="col-12 text-center">
            <img src={logoIcon} width={300} height={150} alt="..." />
            <p style={{color:"green", fontWeight:"bolder"}}>LET'S MAKE IT</p>
        </div>
      </div>
    </div>
  </>
  );
}
