import React from "react";
import "../styles/navbarStyle.scss";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <nav>
      <h1>SMORT</h1>
      <div>
        <Link to={"/register"}>
          <button>Register</button>
        </Link>
        <button>Login</button>
      </div>
    </nav>
  );
}
