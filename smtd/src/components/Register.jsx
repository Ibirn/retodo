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
    e.preventDefault();
    console.log("GRABBIN E: ", registration);
    axios.post(`/api/users`, registration).then((response) => {
      console.log("REGRESP: ", response.data);
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
    </div>
  );
}
