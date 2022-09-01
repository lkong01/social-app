import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("What's happening?");

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:3000/posts/");
    console.log(res.data);
    setPosts(res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/posts/post/create", {
        text: newPost,
      })
      .then(function (response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setNewPost(e.target.value);
  };

  const handleDelete = (e) => {
    console.log(e.target.value);
    axios
      .delete(
        "http://localhost:3000/posts/post/" + String(e.target.value) + "/delete"
      )
      .then(function (response) {
        console.log(response);
        window.location.reload();
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          name="newPost"
          id="newPost"
          cols="30"
          rows="5"
          value={newPost}
          onChange={handleChange}
        />
        <button type="submit">Post</button>
      </form>
      {/* {posts.map((post) => {
        return (
          <div key={post._id}>
            {post.text}

            <button value={post._id} onClick={handleDelete}>
              Delete
            </button>
          </div>
        );
      })}{" "} */}
    </div>
  );
}

export default Home;
