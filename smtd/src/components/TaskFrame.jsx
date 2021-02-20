import React, { useState } from "react";
import Lists from "./Lists";
import axios from "axios";
import "../styles/searchStyle.scss";

export default function TaskFrame(props) {
  const [query, setQuery] = useState({});

  const handleChange = (e) => {
    console.log(e.target.value.trim());
    setQuery({ [e.target.name]: e.target.value.trim() });
  };

  const querySubmit = (e) => {
    e.preventDefault();
    axios.post(`/api/query`, query).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="search"
          placeholder="What do you want to do?"
          onChange={handleChange}
          required
        />
        <button type="submit" onClick={(e) => querySubmit(e)}>
          Add Task
        </button>
      </form>
      <div className="list-wrapper">
        <Lists name={props.name} />
      </div>
    </div>
  );
}
