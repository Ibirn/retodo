import React, { useEffect, useState } from "react";
import "../styles/navbarStyle.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import Login from "./Login";
import ReactDOM from "react-dom";

export default function Navbar(props) {
  const hintLabel = "Login";

  const ToggleContent = ({ toggle, content }) => {
    const [isShown, setIsShown] = useState(false);
    const show = () => setIsShown(true);
    const hide = () => setIsShown(false);

    useEffect(() => {
      const catchBubble = (e) => {
        for (let elem of e.path) {
          if (elem.className === "form-wrapper") {
            return true;
          }
        }
        return false;
      };

      const handleClick = (e) => {
        if (e.target && !catchBubble(e)) {
          return setIsShown(false);
        }
      };
      if (isShown) {
        window.addEventListener("click", handleClick);
      }
      return () => {
        window.removeEventListener("click", handleClick);
      };
    }, [isShown]);
    return (
      <>
        {toggle(show)}
        {isShown && content(hide)}
      </>
    );
  };

  useEffect(() => {
    axios.get("/").then((res) => {});
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
            <ToggleContent
              toggle={(show) => (
                <div onClick={show}>
                  <div className={"hint__label-text"}>{hintLabel}</div>
                </div>
              )}
              content={(hide) => <Login />}
            />
          </>
        )}
      </div>
    </nav>
  );
}
