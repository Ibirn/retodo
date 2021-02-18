import React, { useEffect, useState } from "react";
import "../styles/navbarStyle.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import Login from "./Login";

export default function Navbar(props) {
  const [showLogin, setShowLogin] = useState(false);
  // console.log(props);
  useEffect(() => {
    axios.get("/").then((res) => {
      // console.log("NAVRES: ", res);
    });
  }, [props.name]);

  const logout = (e) => {
    e.preventDefault();
    axios
      .post(`/logout`)
      .then((response) => {
        props.setName("");
        console.log(response);
      })
      .catch((err) => {
        console.log("NOPE", err);
      });
  };
  const handleClickClose = (e) => {
    console.log(e);
  };

  useEffect(() => {
    let dropdown = document.getElementById("login-dropdown");
    if (dropdown !== null) {
      document.addEventListener("click", handleClickClose);
    }
    // console.log(dropdown);
  }, [showLogin]);

  return (
    <nav>
      <Link to={"/"}>
        <h1>SMORT</h1>
      </Link>
      <div>
        {props.name ? (
          <button type="submit" onClick={(e) => logout(e)}>
            Logout
          </button>
        ) : (
          <>
            <Link to={"/register"}>
              <button>Register</button>
            </Link>
            {/* <Link to={"/login"}>
              <button>Login</button>
            </Link> */}
            <button onClick={() => setShowLogin(true)}>Login</button>
            {showLogin ? <Login /> : <></>}
          </>
        )}
      </div>
    </nav>
  );
}
