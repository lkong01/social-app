import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import githubLogo from "./images/icons8-github.svg";
import emailLogo from "./images/icons8-circled-envelope-50.png";

function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [wrongLogin, setWrongLogin] = useState(false);
  const [user, setUser] = useState("");

  function handleLogin(e) {
    let data = {
      username,
      password,
    };

    if (e.target.id == "demo") {
      data = { username: "kbird@email.com", password: "tbird" };
    } else {
      e.preventDefault();
    }

    axios({
      method: "post",
      url: "/api/login",
      data,
      withCredentials: true,
    })
      .then(function (response) {
        console.log(response.data);
        if (response.data == "Incorrect username or password.") {
          setWrongLogin(true);
          console.log("Incorrect username or password.");
        } else {
          console.log(response.data);
          setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
          setWrongLogin(false);
          navigate("/home");
        }
        //window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // useEffect(() => {
  //   localStorage.setItem("currentUser", user.username);

  // }, [user]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);
  return (
    <div className="login-page">
      <div className="login-main">
        <div className="login-page-intro">
          <h1>reactbook</h1>
          <p>Connect with friends and the world around you with reactbook.</p>
        </div>
        <div className="login">
          {wrongLogin ? <p>"Incorrect username or password."</p> : ""}
          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="login-button">Log In</button>
          </form>
          <button id="demo" className="login-button" onClick={handleLogin}>
            {/* <a href="/home">Demo Account</a>{" "} */}
            Demo Account
          </button>
          <hr />
          <button className="signup-button">
            <a href="/signup">Sign Up</a>{" "}
          </button>
        </div>
      </div>
      <div class="footer">
        <div>
          <a href="https://github.com/lkong01">
            <img src={githubLogo} alt="github-icon" />
          </a>
          <a href="mailto:lingweikong10@gmail.com">
            <img src={emailLogo} alt="email-icon" />
          </a>
        </div>
        <p>Lingwei Kong @ 2022</p>
      </div>
    </div>
  );
}

export default Login;
