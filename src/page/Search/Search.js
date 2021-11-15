import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

function Search() {
  const [keyWord, setKeyWord] = useState("");
  const navigate = useNavigate();

  const onChangeInput = (e) => {
    setKeyWord(e.target.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (keyWord) {
      navigate(`/results/${keyWord}`);
    }
  };

  return (
    <form onSubmit={onSubmitForm} className="search">
      <div className="search-input">
        <input
          onChange={onChangeInput}
          value={keyWord}
          placeholder="Search...."
          className="search-text"
          type="text"
        />
        <input className="search-submit" type="submit" value="Search" />
      </div>
    </form>
  );
}

export default Search;
