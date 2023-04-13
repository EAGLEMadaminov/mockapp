import React, { useState } from "react";
import { useGlobalContext } from "../context";

const Search = () => {
  const { setSearchTerm, setShowSearch, searchTerm } = useGlobalContext();
  const [text, setText] = useState();

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const displayMeal = (e) => {
    e.preventDefault();
    setShowSearch(true);
    setSearchTerm(text);
  };
  return (
    <div>
      <form onSubmit={displayMeal}>
        <input
          type="text"
          placeholder="type favorite meal"
          onChange={handleChange}
        />
        <button className="search-btn" onClick={displayMeal}>
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
