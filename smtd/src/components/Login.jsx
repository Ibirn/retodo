import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "../styles/loginStyle.scss";

export default function Login(props) {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api/login`, login)
      .then((response) => {
        if (response.status === 200) {
          axios.get(`/api/tasks`).then((response) => {
            props.setName(response.data.user);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="login-dropdown" className="form-wrapper">
      <form action="/api/login" method="post">
        <dl>
          <dt>
            <div>
              <label htmlFor="email">Your email address:</label>
            </div>
          </dt>
          <dd>
            <input
              type="email"
              name="email"
              autoFocus="autofocus"
              id="email"
              onChange={handleChange}
              required
            />
          </dd>
        </dl>
        <dl>
          <dt>
            <label htmlFor="password">Password:</label>
          </dt>
          <dd>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              required
            />
          </dd>
        </dl>
        <div>
          <button type="submit" onClick={(e) => loginSubmit(e)}>
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}
