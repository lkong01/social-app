import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";

function Search() {
  const [results, setResults] = useState([]);
  const [keyword, setKeyword] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await axios.get(`/api/user/search/${keyword}`, {
      withCredentials: true,
    });
    console.log(res.data);
    setResults(res.data);
  };

  return (
    <div className="wraper">
      <Nav></Nav>
      <div
        className="search"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <form onSubmit={handleSearch} style={{ margin: "1rem" }}>
          <input
            type="text"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            placeholder="find a user"
          />
          <button>Search</button>
        </form>

        {results.map((result) => {
          return (
            <div className="result-item post-author">
              <a href={`/user/${result._id}`}>
                <img src={result.profileImg} alt="profile-img" />
              </a>

              <div className="name">
                {" "}
                <a href={`/user/${result._id}`}>
                  {" "}
                  {result.firstName} {result.lastName}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Search;
