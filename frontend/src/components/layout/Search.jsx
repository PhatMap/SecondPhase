import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const history = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history(`/search/${keyword}`);
    } else {
      history("/");
    }
  };

  return (
    <form className="Search-form" onSubmit={searchHandler}>
      <input
        className="Search-input"
        type="search"
        placeholder="Search here..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchHandler(e);
          }
        }}
      />
      <button onClick={searchHandler}>
        <i className="fa fa-search Search-icon"></i>
      </button>
    </form>
  );
};

export default Search;
