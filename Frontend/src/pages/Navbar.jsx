import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to="/">
            <button className="navbar-link">Home</button>
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/posts">
            <button className="navbar-link">Create Post</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
