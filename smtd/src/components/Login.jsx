import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "../styles/loginStyle.scss";

export default function Login(props) {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    console.log("GRABBIN LOG: ", login);
    axios
      .post(`/api/login`, login)
      .then((response) => {
        if (response.status === 200) {
          setSuccess(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // return (
  //   <form action="/api/login" method="post">
  //     <div>
  //       <label>Username:</label>
  //       <input
  //         type="email"
  //         id="email"
  //         name="email"
  //         onChange={handleChange}
  //         required
  //       />
  //       <br />
  //     </div>
  //     <div>
  //       <label>Password:</label>
  //       <input
  //         type="password"
  //         id="password"
  //         name="password"
  //         onChange={handleChange}
  //         required
  //       />
  //     </div>
  //     <div>
  //       <button type="submit" onClick={(e) => loginSubmit(e)}>
  //         Log In
  //       </button>
  //     </div>
  //     {successRedirect ? <Redirect to={"/"} /> : <></>}
  //   </form>
  // );

  return (
    <div className="form-wrapper">
      <form action="/api/login" method="post">
        <dl>
          <dt>
            <div>
              <label for="email">Your email address:</label>
            </div>
          </dt>
          <dd>
            <input
              type="email"
              name="email"
              autofocus="autofocus"
              autocomplete="username"
              id="email"
              onChange={handleChange}
              required
            />
          </dd>
        </dl>
        <dl>
          <dt>
            <label for="password">Password:</label>
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
