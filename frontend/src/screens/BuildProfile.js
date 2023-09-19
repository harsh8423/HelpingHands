import React, { useState } from "react";
import AchievementUpload from "../components/UploadScript/AchievementUpload";
import BioUpload from "../components/UploadScript/BioUpload";
import CertificateUpload from "../components/UploadScript/CertificateUpload";
import ProjectUploadScript from "../components/UploadScript/ProjectUploadScript";
import UserNavbar from "../components/UserNavbar"

export default function BuildProfile() {
  const [pageState, setpageState] = useState("");

  const handlePage = (name) => {
    setpageState(name);
  };
  return (
    <div>
        <UserNavbar/>
      <div className="container mt-5">
        <h1 style={{fontWeight:"bold"}}>Build Profile</h1>
        <hr />
        {pageState === "" ? (
          <div className="row" style={{color:"green"}}>
            <div
            style={{border:"2px solid green", cursor:"pointer"}}
              onClick={() => handlePage("Upload Project")}
              className="col-12 normal-box m-2 p-4"
            >
              <h3>Upload Project</h3>
            </div>
            <div
            style={{border:"2px solid lightgreen", cursor:"pointer"}}
            onClick={() => handlePage("Upload Certificate")}
              className="col-12 normal-box m-2 p-4"
            >
              <h3>Upload Certificate</h3>
            </div>
            <div
            style={{border:"2px solid green", cursor:"pointer"}}
            onClick={() => handlePage("Add Achievements")}
              className="col-12 normal-box m-2 p-4"
            >
              <h3>Add Achievements</h3>
            </div>
            <div
            style={{border:"2px solid lightgreen", cursor:"pointer"}}
            onClick={() => handlePage("Add Bio")}
              className="col-12 normal-box m-2 p-4"
            >
              <h3>Add Bio</h3>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-12">
              {pageState === "Upload Project" && <ProjectUploadScript PageState={pageState} />}
            </div>
            <div className="col-12">
              {pageState === "Upload Certificate" && <CertificateUpload PageState={pageState}/>}
            </div>
            <div className="col-12">
              {pageState === "Add Achievements" && <AchievementUpload PageState={pageState}/>}
            </div>
            <div className="col-12">
              {pageState === "Add Bio" && <BioUpload PageState={pageState}/>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
