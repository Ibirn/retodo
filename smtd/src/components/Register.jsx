import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default function Register(props) {
  // useEffect(() => {
  //   axios.get(`/api/tasks`).then((response) => {
  //     console.log(response.data);
  //   });
  //   return () => {};
  // }, []);
  const [registration, setRegistration] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    setRegistration({
      ...registration,
      [e.target.name]: e.target.value.trim(),
    });
    console.log(error);
  };

  const registrationSubmit = (e) => {
    e.preventDefault();
    console.log("GRABBIN E: ", registration);
    axios.post(`/api/users`, registration).then((response) => {
      console.log(response.data);
      if (response.data === "ERROR - Email is already in use.") {
        setError(true);
      } else {
        setRedirect(true);
      }
    });
  };

  return (
    <div>
      <form>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <label htmlFor="email"></label>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            onChange={handleChange}
            required
          />
          <label htmlFor="password"></label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit" onClick={(e) => registrationSubmit(e)}>
            Register
          </button>
        </div>
      </form>
      {error ? <p>Email already in use.</p> : <></>}
      {redirect ? <Redirect to={"/"} /> : <></>}
    </div>
  );
}
