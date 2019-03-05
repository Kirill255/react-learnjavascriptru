import React, { Component } from "react";
import PropTypes from "prop-types";
import Comment from "./Comment";
import toggleOpen from "../decorators/toggleOpen";

// component
const CommentList = ({ comments = [], isOpen, toggleOpen }) => {
  const text = isOpen ? "hide comments" : "show comments";

  return (
    <div>
      <button onClick={toggleOpen}>{text}</button>
      {getBody({ isOpen, comments })}
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.array,
  //from toggleOpen decorator
  isOpen: PropTypes.bool,
  toggleOpen: PropTypes.func
};

// handle function
function getBody({ isOpen, comments }) {
  if (!isOpen) return null;
  if (!comments.length) return <p>No comments yet</p>;

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <Comment comment={comment} />
        </li>
      ))}
    </ul>
  );
}

export default toggleOpen(CommentList);
