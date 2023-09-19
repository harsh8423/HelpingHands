import React from "react";
import logoIcon from "../images/Screenshot_2023-08-09_143330-transformed-transformed.png";

import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
        <img src={logoIcon} width={100} height={40} alt="..." />

        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="/navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Login">
                LOGIN
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
