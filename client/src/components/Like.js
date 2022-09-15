import React, { useEffect, useState } from "react";
import axios from "axios";
import LikeIcon from "./images/thumb-up.png";

function Like(props) {
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState([]);

  const fetchLike = async () => {
    const res = await axios.get(`/api/post/${props.postId}/like`, {
      withCredentials: true,
    });
    // console.log(res.data);
    setLike(res.data);
  };

  const fetchLikes = async () => {
    const res = await axios.get(`/api/post/${props.postId}/likes`, {
      withCredentials: true,
    });
    // console.log(res.data);
    setLikes(res.data);
  };

  function handleLike() {
    let method = "post";
    if (like) {
      method = "delete";
    }

    axios({
      method,
      url: `/api/post/${props.postId}/like`,
      data: {},
      withCredentials: true,
    })
      .then(function (response) {
        // console.log(response);
        fetchLike();
        fetchLikes();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchLike();
    fetchLikes();
    // console.log(likes);
  }, []);

  return (
    <div className="like">
      <button onClick={handleLike}>
        <img
          src={LikeIcon}
          alt="like-icon"
          style={like ? {} : { filter: "grayscale(100%)" }}
        />
        <span style={like ? { color: "#1B74E4" } : {}}>Like</span> {"  "}
        {likes.length > 0 ? likes.length : ""}
      </button>
    </div>
  );
}

export default Like;
