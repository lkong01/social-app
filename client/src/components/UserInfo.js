import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/UserInfo.css";

function UserInfo(props) {
  const [user, setUser] = useState({
    firstName: "",
    userProfileImg: "",
    lastName: "",
    friends: [],
  });
  const [friends, setFriends] = useState([]);
  const [profileImg, setProfileImg] = useState();

  const fetchUser = async () => {
    const res = await axios.get(`/api/user/${props.userId}`, {
      withCredentials: true,
    });
    // console.log(res.data.profileImg, "img address", res.data);
    setUser(res.data);
    // console.log(res.data);
    // setFriends(res.data.friends);
    // setProfileImg(res.data.profileImg);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="user-info">
      <div className="user-name">
        <img src={user.profileImg} alt="profile-img" />
        <div>
          {user.firstName} {user.lastName}
        </div>
      </div>

      <div className="user-friends">
        <h2>
          Friends <span>{user.friends ? user.friends.length : ""}</span>
        </h2>
        <div className="user-friends-content">
          {user.friends.map((friend) => {
            return (
              <div className="friend-item" key={friend._id}>
                <a href={`/user/${friend._id}`}>
                  <img src={friend.profileImg} alt="profile-img" />
                </a>
                <a href={`/user/${friend._id}`}>
                  {" "}
                  <div className="name">
                    {friend.firstName} {friend.lastName}
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
