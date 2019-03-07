import React, { Component } from "react";
import PropTypes from "prop-types";
import Comment from "./Comment";
import CommentForm from "./CommentForm/CommentForm";
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
  if (!comments.length) {
    return (
      <div>
        <p>No comments yet</p>
        <CommentForm />
      </div>
    );
  }

  return (
    <div>
      <ul>
        {comments.map((id) => (
          <li key={id}>
            <Comment id={id} />
          </li>
        ))}
      </ul>
      <CommentForm />
    </div>
  );
}

export default toggleOpen(CommentList);
