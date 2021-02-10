import React from "react";

export default function Search(props) {
  return (
    <div>
      <input
        type="search"
        placeholder="What do you want to do?"
        results="0"
        required
      ></input>
      <button className="search-button">Search</button>
    </div>
  );
}
