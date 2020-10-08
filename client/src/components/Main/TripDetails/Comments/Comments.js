import React, { Component } from "react";
import "./Comments.css";

function Comments(props) {
  return (
    <div className="comment_section">
      {props.comments.length > 0 ? (
        <div>
          {props.comments.map((comment, index) => {
            return (
              <div key={index}>
                <h4>{comment.userName}</h4>
                <p>{comment.comment}</p>
                <br />
              </div>
            );
          })}
        </div>
      ) : (
        <p>No comments yet, start by posting one!</p>
      )}

      {!props.loading ? (
        <form onSubmit={props.onSubmit}>
          <div className="komentar">
            <textarea
              disabled={!props.isLoggedIn}
              className="text_area2"
              onChange={props.handleChange}
              value={props.comment}
              placeholder={
                !props.isLoggedIn ? "Logg In To Comment" : "Write a comment..."
              }
            ></textarea>
            <button disabled={!props.isLoggedIn} className="bookNow">
              Submit comment
            </button>
          </div>
        </form>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default Comments;
