import React from "react";
import "../css/LoginCss.css";
import welcomeIcon from "../images/welcome.png";
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
    delay: 30,
  });

  typewriter
    .typeString(
      `"Welcome to 'Helping Hands,' your gateway to collaborative innovation for the NASA Space Apps Challenge! <br/>
       Dive into a universe of open science projects and skilled collaborators. 
       Join a community where the possibilities of space exploration are just a click away. 
       Together, we reach for the stars, fostering collaboration and discovery that will shape the future of space exploration."`
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
  typewriter.pauseFor(2000).typeString("Your gateway to collaborative innovation for the NASA Space Apps Challenge!").start();

  return (
    <div
      className="row m-1 p-4 normal-box homeBanner"
      style={{
        backgroundColor: "rgba(10, 91, 211, 0.9)",
        color: "white",
        position: "relative",
      }}
    >
      <div className="col-sm-9 col-12">
        <h3
          id="heading"
          style={{ fontFamily: "cursive", fontWeight: "bold", fontSize:"2.2vmax" }}
        ></h3>
        <p id="para">
          <br />
        </p>
        <p id="para2">
          <br />
        </p>
        <button
          id="buton"
          className="button-07 m-0"
          style={{
            borderRadius: "35px",
            padding: "2px",
            height: "35px",
            margin: "0px",
          }}
        ></button>
      </div>
      <div className="col-3">
      <img className="welcomeimg"
        style={{ float: "right", padding: "4px" }}
        src={welcomeIcon}
        width={200}
        height={150}
        alt="..."
      />
      </div>
    </div>
  );
}
