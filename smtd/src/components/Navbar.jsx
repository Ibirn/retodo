import React, { useEffect } from "react";
import "../styles/navbarStyle.scss";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  console.log(props);
  useEffect(() => {
    axios.get("/").then((res) => {
      console.log("NAVRES: ", res);
    });
  }, [props.name]);

  return (
    <nav>
      <Link to={"/"}>
        <h1>SMORT</h1>
      </Link>
      <div>
        {props.name ? (
          <button>Logout</button>
        ) : (
          <>
            <Link to={"/register"}>
              <button>Register</button>
            </Link>
            <Link to={"/login"}>
              <button>Login</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
