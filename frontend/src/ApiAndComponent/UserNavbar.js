// import React from "react";
import logoIcon from "../images/Screenshot_2023-08-09_143330-transformed-transformed.png";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// export default function Navbar() {

//   let navigate = useNavigate();

//   const handleLogout = ()=>{
//     localStorage.removeItem("userData")
//       navigate("../Login")
//   }
//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <Link className="navbar-brand" to="/">
//         <img src={logoIcon} width={100} height={40} alt="..." />

//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-toggle="collapse"
//           data-target="/navbarNavDropdown"
//           aria-controls="navbarNavDropdown"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNavDropdown">
//           <ul className="navbar-nav">
//             <li className="nav-item active">
//               <Link className="nav-link" to="/UserPage">
//                 Home <span className="sr-only"></span>
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/">
//                 Settings
//               </Link>
//             </li>
//             <li className="nav-item dropdown">
//               <Link
//                 className="nav-link dropdown-toggle"
//                 to="/"
//                 id="navbarDropdownMenuLink"
//                 data-toggle="dropdown"
//                 aria-haspopup="true"
//                 aria-expanded="false"
//               >
//                 Post Work
//               </Link>
//               <div
//                 className="dropdown-menu"
//                 aria-labelledby="navbarDropdownMenuLink"
//               >
//                 <Link className="dropdown-item" to="/">
//                   Exchange Project
//                 </Link>
//                 <Link className="dropdown-item" to="/">
//                   Credit Project
//                 </Link>
//               </div>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/ChatRoom">
//                 Messages
//               </Link>
//             </li>
//           </ul>
//         </div>
//             <div onClick={handleLogout} style={{float:"right", fontWeight:"bold", fontSize:"17px"}}>
//               <Link className="nav-link" to="/">
//                 Logout
//               </Link>
//             </div>
//       </nav>
//     </div>
//   );
// }
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="UserPage"><img src={logoIcon} width={100} height={40} alt="..." /></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/UserPage">Home</Nav.Link>
            <Nav.Link href="Chatroom">messages</Nav.Link>
            <Nav.Link href="/">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;