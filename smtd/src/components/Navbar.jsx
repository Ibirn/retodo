import React from "react";
import "../styles/navbarStyle.scss";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <nav>
      <Link to={"/"}>
        <h1>SMORT</h1>
      </Link>
      <div>
        <Link to={"/register"}>
          <button>Register</button>
        </Link>
        <Link to={"/login"}>
          <button>Login</button>
        </Link>
      </div>
    </nav>
  );
}
