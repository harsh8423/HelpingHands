import React from "react";
import "../css/LoginCss.css";
import welcomeIcon from "../images/welcome.png";
import videobanner from "../images/bannervideo.mp4";
import "./homeBanner.css";

import Typewriter from "typewriter-effect/dist/core";

export default function HomeBanner() {
  var app = document.getElementById("heading");
  var typewriter = new Typewriter(app, {
    delay: 55,
  });
  typewriter.typeString("Welcome to Helping Hands,").start();

  var ap = document.getElementById("para");
  var typewriter = new Typewriter(ap, {
    delay: 20,
  });

  typewriter
    .typeString(
      `Your gateway to collaborative innovation for the NASA Space Apps Challenge! <br/>
       Dive into a universe of open science projects and skilled collaborators. <br/>
       Join a community where the possibilities of space exploration are just a click away. <br/>
       Together, we reach for the stars, fostering collaboration and discovery that will shape the future of space exploration.`
    )
    .start();

  var appp = document.getElementById("buton");
  var typewriter = new Typewriter(appp, {
    delay: 70,
  });
  typewriter.pauseFor(2000).typeString("Learn more").start();

  var appp2 = document.getElementById("para2");
  var typewriter = new Typewriter(appp2, {
    delay: 40,
  });
  typewriter
    .pauseFor(2000)
    .typeString(
      "Your gateway to collaborative innovation for the NASA Space Apps Challenge!"
    )
    .start();

  return (
    <div
      className="row homeBanner"
      style={{
        color:"white",
        position: "relative",
        overflow: "hidden", // Ensures content within the container doesn't overflow
      }}
    >
      <video
        autoPlay
        muted
        loop
        id="myVideo"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src={videobanner} type="video/mp4" />
      </video>
      <h1 
       style={{ fontFamily: "cursive", fontWeight: "bold", fontSize:"2.2vmax" }}
      id="heading" className="col-sm-12 mt-5 col-12 text-center"></h1>

      <div
      className="text-center col-12"
       style={{fontWeight: "bold", fontSize:"1.2vmax" }}
      id="para">
        <br />
      </div>
      <p id="para2">
        <br />
      </p>
      <br />
      <div>
      {/* <button
        id="buton"
        className="button-07 m-0"
        style={{
          borderRadius: "35px",
          padding: "2px",
          height: "35px",
          margin: "0px",
        }}
      >Learn More</button> */}
      </div>
    </div>
  );
}
