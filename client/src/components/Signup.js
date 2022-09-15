import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImg, setProfileImg] = useState("");

  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("profileImg", profileImg);

    axios({
      method: "post",
      url: "/api/signup",
      data: formData,
      withCredentials: true,
    })
      .then(function (response) {
        console.log(response.data);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="login-page">
      <div className="login-main">
        <div className="login">
          <form onSubmit={onSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
            {/* <input
              type="file"
              onChange={(e) => {
                setProfileImg(e.target.files[0]);
              }}
            /> */}
            <input
              type="file"
              id="avatar-input"
              onChange={(e) => {
                setProfileImg(e.target.files[0]);
              }}
            />
            <label htmlFor="avatar-input">Add Profile Picture</label>
            <button className="login-button">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
