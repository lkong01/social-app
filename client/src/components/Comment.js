import React, { useEffect, useState } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import Like from "./Like";
import CommentIcon from "./images/comment.png";
import "../styles/Comment.css";

function Comment(props) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    const res = await axios.get(`/api/post/${props.postId}/comments`, {
      withCredentials: true,
    });
    //console.log(res.data.comments);
    setComments(res.data.comments);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: `/api/post/${props.postId}/comment`,
      data: {
        text: newComment,
        post: props.postId,
      },
      withCredentials: true,
    })
      .then(function (response) {
        console.log(response);
        setNewComment("");
        fetchComments();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCommentChange = (e) => {
    console.log(e.target.value);
    setNewComment(e.target.value);
  };

  const handleCommentDelete = (e) => {
    console.log(e.target.value);
    axios
      .delete(`/api/post/${props.postId}/comment/` + String(e.target.value))
      .then(function (response) {
        console.log(response);
        fetchComments();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="comments">
      <div className="comment-option">
        <Like postId={props.postId}></Like>
        <button
          onClick={() => {
            document.querySelector("#newComment").focus();
          }}
        >
          <img src={CommentIcon} alt="comment-icon" />
          Comment
        </button>
      </div>

      <div className="new-comment">
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            name="newComment"
            id="newComment"
            value={newComment}
            placeholder="Write a comment"
            required
            onChange={handleCommentChange}
          />
          <button type="submit">Comment</button>
        </form>
      </div>

      {comments.map((comment) => {
        return (
          <div className="comment" key={comment._id}>
            <img src={comment.author.profileImg} alt="author-img" />
            <div className="comment-main">
              <div className="comment-header">
                <div className="comment-author">
                  {comment.author.firstName} {comment.author.lastName}
                </div>
                <div className="comment-date">
                  {DateTime.fromISO(comment.createdAt).toRelativeCalendar()}
                </div>
                {JSON.parse(localStorage.getItem("user"))._id ===
                comment.author._id ? (
                  <button value={comment._id} onClick={handleCommentDelete}>
                    x
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="comment-text">{comment.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Comment;
