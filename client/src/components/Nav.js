import axios from "axios";
import "../styles/Home.css";
import HomeIcon from "./images/icons8-home.svg";

function Nav() {
  return (
    <nav>
      <a href="/home">reactbook</a>
      <div className="nav-main">
        <a href="/home">
          {/* <img className="home-icon" src={HomeIcon} alt="home-icon" /> Home */}
          Home
        </a>
        <a href="/profile">Profile</a>
        <a href="/friends">Friends</a>
        <a href="/search">Search</a>
        {/* <a href="/home">Setting</a> */}
        <button
          onClick={() =>
            axios.get("/api/logout").then((res) => {
              console.log(res.data);
              localStorage.clear();
              window.location.href = "/login";
            })
          }
        >
          logout
        </button>
      </div>
    </nav>
  );
}

export default Nav;
