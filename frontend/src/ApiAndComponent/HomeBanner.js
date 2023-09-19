import React from "react";
import "../css/LoginCss.css";
import referIcon from "../images/megaphone.png"
import welcomeIcon from "../images/welcome.png";
import Typewriter from 'typewriter-effect/dist/core';


export default function HomeBanner() {

  var app = document.getElementById('heading');

  var typewriter = new Typewriter(app, {
      delay: 75
  });
  
  typewriter.typeString('Welcome to Helping Hands,')
      .start();

      var ap = document.getElementById('para');

      var typewriter = new Typewriter(ap, {
        delay: 40
    });

    typewriter.typeString(`the vibrant community where skills find their perfect match! <br /> Whether
    you're a coding maestro, a design virtuoso, a marketing maven, or a
    multi-talented creator, you've found your home. Dive into a world
    where you can both share your expertise and access the talents of
    others, all while earning credits for your contributions.
     Your journey starts here—where skills meet
    synergy, and opportunities know no bounds."`)
      .start()


      var appp = document.getElementById('buton');

      var typewriter = new Typewriter(appp, {
        delay: 70
    });
    typewriter.pauseFor(5000)
    .typeString('Learn more')
    .start();

  return (
    <div className="row">
      <div
        className="col-9 m-3 p-4 normal-box"
        style={{ backgroundColor: "rgba(10, 91, 211, 0.9)", color: "white", }}
      >
        <img
              style={{ float: "right", padding: "4px" }}
              src={welcomeIcon}
              width={200}
              height={150}
              alt="..."
            />
        <h3 id="heading" style={{fontFamily:"cursive", fontWeight:"bold"}}></h3>
        <p  id="para">
           <br />
        </p>
          <button id="buton" className="button-07 m-0" style={{borderRadius:"35px", padding:"2px", height:"35px", margin:"0px"}}></button>
      </div>
      <div
        className="col-2 m-3 p-3 normal-box"
        style={{ backgroundColor: "rgba(130, 230, 113, 0.844)", height:"auto", }}
      >
        {/* <h3 style={{fontFamily:"cursive"}}>Refer and Earn</h3> */}
        <p style={{fontWeight:"bolder"}}>
        <img
              style={{  padding: "4px" }}
              src={referIcon}
              width={100}
              height={80}
              alt="..."
            /> <br />
          Refer your friends and earn 10% when your friend complete first project plus 1% of his lifetime earnings.
        </p>
      </div>
    </div>
  );
}
