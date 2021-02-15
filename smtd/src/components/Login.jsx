import React, { useState } from "react";
import axios from "axios";

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
    console.log("GRABBIN LOG: ", login);
    axios.post(`/api/login`, login).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <form action="/api/login" method="post">
      <div>
        <label>Username:</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          required
        />
        <br />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input type="submit" value="Log In" onClick={(e) => loginSubmit(e)} />
      </div>
    </form>
  );
}
