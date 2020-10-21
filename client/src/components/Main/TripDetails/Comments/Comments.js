import React, { useState } from "react";
import "./Comments.css";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../../../actions/tripActions";
import { useParams } from "react-router-dom";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 2px auto;
  border-color: red;
`;

const Comments = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.tripReducer.comments);
  const isLoggedIn = useSelector((state) => state.loadingReducer.isLoggedIn);
  const addingComment = useSelector(
    (state) => state.loadingReducer.addingComment
  );
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
              className="text_area2"
              onChange={handleChange}
              value={comment}
              placeholder={"Write a comment..."}
            ></textarea>
            {addingComment ? (
              <div className="bookNow">
                <ClipLoader css={override} size={15} color={"#123abc"} />
              </div>
            ) : (
              <button className="bookNow">Add comment</button>
            )}
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default Comments;
