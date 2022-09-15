import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home.js";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Friends from "./components/Friends";
import User from "./components/User";
import Search from "./components/Search";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/profile" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
