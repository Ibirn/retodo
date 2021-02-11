import React, { useState } from "react";
import axios from "axios";

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

  const handleChange = (e) => {
    setRegistration({
      ...registration,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const registrationSubmit = (e) => {
    // e.preventDefault();
    console.log("GRABBIN E: ", e);
    axios.post(`/api/users`, e).then((response) => {
      console.log("REGRESP: ", response.data);
    });
  };

  return (
    <div>
      <form action="/api/users" method="POST">
        <div>
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
          <button onClick={() => registrationSubmit(registration)}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
