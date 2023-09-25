import React from "react";


// import Home from "./screens/Home";
import Login from "./screens/Login";
import ProfileDetail from "./screens/ProfileDetail";
import MobileOTP from "./screens/MobileOTP";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContextStat from "./ApiAndComponent/ContetxStat";

import UserPage from "./screens/UserPage";
import UserProfilePage from "./screens/UserProfilePage";
import PostJob from "./components/PostJob";
import MyContractandProposal from "./components/MyContractandProposal";
import ProjectProposal from "./screens/ProjectProposal";
import BuildProfile from "./screens/BuildProfile";
import PublicViewProfilePage from "./screens/PublicViewProfilePage";
import MyConnects from "./teams/MyConnects";
import ChatRoom from "./screens/ChatRoom";
import CreateTeam from "./teams/CreateTeam";
import TeamRoom from "./teams/TeamRoom";
import TeamRequests from "./teams/TeamRequests";
import JobConfirmLetter from "./components/JobConfirmLetter";
function App() {
  return (
    <>
      {/* Wrapping the entire app with a context provider */}
      <ContextStat>
        <Router>
          <div className="App">
            <Routes>
              {/* Define routes for different screens/components */}
              {/* <Route exact path="/" element={<Home />} /> */}
              <Route exact path="/" element={<Login />} />
              <Route exact path="/ProfileDetail" element={<ProfileDetail />} />
              <Route exact path="/MobileOTP" element={<MobileOTP />} />
              <Route exact path="/UserPage" element={<UserPage />} />
              <Route exact path="/UserProfilePage" element={<UserProfilePage />} />
              <Route exact path="/PostJob" element={<PostJob/>} />
              <Route exact path="/ProjectProposal" element={<ProjectProposal/>} />
              <Route exact path="/BuildProfile" element={<BuildProfile/>} />
              <Route exact path="/MyContractandProposal" element={<MyContractandProposal/>} />
              <Route exact path="/PublicViewProfilePage" element={<PublicViewProfilePage/>} />
              <Route exact path="/MyConnects" element={<MyConnects/>} />
              <Route exact path="/ChatRoom" element={<ChatRoom/>} />
              <Route exact path="/CreateTeam" element={<CreateTeam/>} />
              <Route exact path="/TeamRoom" element={<TeamRoom/>} />
              <Route exact path="/TeamRequests" element={<TeamRequests/>} />
              <Route exact path="/JobConfirmLetter" element={<JobConfirmLetter/>} />
            </Routes>
          </div>
        </Router>
      </ContextStat>
    </>
  );
}

export default App;
