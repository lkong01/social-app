import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import "../styles/Home.css";
import "../styles/Posts.css";
import DeleteIcon from "./images/icons8-delete-64.png";

import UserInfo from "./UserInfo";
import Comment from "./Comment";
import Like from "./Like";
import Nav from "./Nav";

function User(props) {
  let { id } = useParams();

  if (!id) {
    id = JSON.parse(localStorage.getItem("user"))._id;
  }
  console.log(id);
  const [posts, setPosts] = useState([]);

  const handlePostDelete = (e) => {
    console.log(e.currentTarget.value);
    axios
      .delete("/api/post/" + String(e.currentTarget.value))
      .then(function (response) {
        console.log(response);
        fetchUserPosts();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchUserPosts = async () => {
    const res = await axios.get(`/api/user/${id}/posts`, {
      withCredentials: true,
    });
    console.log(res.data);
    setPosts(res.data.posts);
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);
  return (
    <div className="home">
      <Nav></Nav>
      <div className="profile-main">
        <UserInfo userId={id}></UserInfo>
        <div className="posts">
          <div className="home-posts">
            {posts.map((post) => {
              return (
                <div className="post" key={post._id}>
                  <div className="post-head">
                    <div className="post-author">
                      <a href={`/user/${post.author._id}`}>
                        <img
                          src={post.author.profileImg}
                          alt="post-author-img"
                        />
                      </a>

                      <div className="post-author-right">
                        <div className="post-author-name">
                          <a href={`/user/${post.author._id}`}>
                            {" "}
                            {post.author.firstName} {post.author.lastName}
                          </a>
                        </div>
                        <div className="post-time">
                          Posted{" "}
                          {DateTime.fromISO(
                            post.createdAt
                          ).toRelativeCalendar()}
                        </div>
                      </div>
                    </div>
                    {JSON.parse(localStorage.getItem("user"))._id ==
                    post.author._id ? (
                      <button value={post._id} onClick={handlePostDelete}>
                        <img
                          // value={post._id}
                          className="post-delete-img"
                          src={DeleteIcon}
                          alt=""
                        />
                        delete
                      </button>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="post-content">
                    <div className="post-text">{post.text}</div>

                    {post.image ? <img src={post.image} alt="post-img" /> : ""}
                  </div>

                  <Comment postId={post._id}></Comment>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
