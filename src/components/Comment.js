import React from "react";

const Comment = ({ comment }) => {
  return (
    <div>
      <p>
        {comment.text} <b>by {comment.user}</b>
      </p>
    </div>
  );
};

export default Comment;
