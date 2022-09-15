import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Home.css";
import Comment from "./Comment";
import Like from "./Like";
import { DateTime } from "luxon";
import "../styles/Posts.css";
import DeleteIcon from "./images/icons8-delete-64.png";
import ImageIcon from "./images/image.png";

function Posts(props) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [postImage, setPostImage] = useState();

  const fetchPosts = async () => {
    const res = await axios.get("/api/posts/", {
      withCredentials: true,
    });
    // console.log(res.data);
    setPosts(res.data);
    // setPostImage(res.data.image);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("text", newPost);
    formData.append("image", postImage);
    for (const value of formData.values()) {
      console.log(value);
    }
    axios({
      method: "post",
      url: "/api/post",
      data: formData,
      withCredentials: true,
    })
      .then(function (response) {
        console.log(response);
        setPostImage("");
        setNewPost("");
        fetchPosts();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handlePostChange = (e) => {
    console.log(e.target.value);
    setNewPost(e.target.value);
  };

  const handlePostDelete = (e) => {
    console.log(e.currentTarget.value);
    axios
      .delete("/api/post/" + String(e.currentTarget.value))
      .then(function (response) {
        console.log(response);
        fetchPosts();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // const handleEdit = (e) => {
  //   console.log(e.target);
  //   // axios
  //   //   .edit(
  //   //     "http://localhost:3000/posts/post/" + String(e.target.value) + "/delete"
  //   //   )
  //   //   .then(function (response) {
  //   //     console.log(response);
  //   //     window.location.reload();
  //   //   })
  //   //   .catch(function (error) {
  //   //     console.log(error);
  //   //   });
  // };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="posts">
      <div className="new-post">
        <form onSubmit={handlePostSubmit}>
          <textarea
            name="newPost"
            id="newPost"
            rows="3"
            value={newPost}
            placeholder="What's happening?"
            onChange={handlePostChange}
            required
          />
          <input
            className="new-post-img-input"
            type="file"
            id="post-img-input"
            onChange={(e) => {
              console.log(e.target.files[0]);
              setPostImage(e.target.files[0]);
            }}
          />
          <label htmlFor="post-img-input">
            <img src={ImageIcon} alt="" />
            {postImage ? postImage.name : "Add a picture"}
          </label>
          <button type="submit">Post</button>
        </form>
      </div>

      <div className="home-posts">
        {posts.map((post) => {
          return (
            <div className="post" key={post._id}>
              <div className="post-head">
                <div className="post-author">
                  <a href={`/user/${post.author._id}`}>
                    <img src={post.author.profileImg} alt="post-author-img" />
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
                      {DateTime.fromISO(post.createdAt).toRelativeCalendar()}
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
  );
}

export default Posts;
