import React, { useState, useEffect } from "react";
import "./Comments.css";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../../../actions/tripActions";
import { useParams } from "react-router-dom";

const Comments = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.tripReducer.comments);
  const isLoggedIn = useSelector((state) => state.loadingReducer.isLoggedIn);
  const [comment, setComment] = useState("");
  const tripID = +useParams().id;

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment(tripID, comment));
    setComment("");
  };

  return (
    <div className="comment_section">
      {comments.length > 0 ? (
        <div>
          {comments.map((comment, index) => {
            return (
              <div key={index}>
                <h4>{comment.userName}</h4>
                <p>{comment.comment}</p>
                <br />
              </div>
            );
          })}
        </div>
      ) : isLoggedIn ? (
        <p>No comments yet, start by posting one!</p>
      ) : null}

      {isLoggedIn ? (
        <form onSubmit={onSubmit}>
          <div className="komentar">
            <textarea
              disabled={!isLoggedIn}
              className="text_area2"
              onChange={handleChange}
              value={comment}
              placeholder={
                !isLoggedIn ? "Logg In To Comment" : "Write a comment..."
              }
            ></textarea>
            <button className="bookNow">Submit comment</button>
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default Comments;
