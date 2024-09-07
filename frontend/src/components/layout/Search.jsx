import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const history = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [isActive, setIsActive] = useState(false);

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
      <i className="fa fa-search Search-icon"></i>
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
      <button
        onClick={() => {
          searchHandler(e);
        }}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        className={isActive ? "active" : ""}
      >
        Tìm Kiếm
      </button>
    </form>
  );
};

export default Search;
