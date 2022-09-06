import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    axios({
      method: "post",
      url: "http://127.0.0.1:3000/login",
      data: {
        username,
        password,
      },
      withCredentials: true,
    }).then(async (res) => {
      if (res.data.isAuthenticated) {
        setIsAuthenticated(true);
        console.log(res.data.isAuthenticated);

        //navigate("/home");
      } else {
        //navigate("/");
      }
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>submit</button>
      </form>
      <button
        onClick={() =>
          axios.get(process.env.REACT_APP_api + "/log-out").then((res) => {
            console.log(res.data);
          })
        }
      >
        logout
      </button>
    </div>
  );
}

export default Login;
