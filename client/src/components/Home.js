import "../styles/Home.css";

import Nav from "./Nav";
import Posts from "./Posts";
import UserInfo from "./UserInfo";

function Home(props) {
  return (
    <div className="home">
      <Nav></Nav>

      <div className="profile-main">
        <UserInfo
          //pass user id from local storage saved during login
          userId={JSON.parse(localStorage.getItem("user"))._id}
        ></UserInfo>
        <Posts></Posts>
      </div>
    </div>
  );
}

export default Home;
