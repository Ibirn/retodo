import React from "react";
import "../styles/navbarStyle.scss";

export default function Navbar(props) {
  return (
    <nav>
      <h1>SMORT</h1>
      <div>
        <button>Register</button>
        <button>Login</button>
      </div>
    </nav>
  );
}
