import React, { Component } from "react";
import Comment from "./Comment";

class CommentList extends Component {
  static defaultProps = {
    comments: []
  };

  state = {
    isOpen: false
  };

  getBody() {
    if (!this.state.isOpen) return null;

    const { comments } = this.props;
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

  toggleOpen = (event) =>
    this.setState({
      isOpen: !this.state.isOpen
    });

  render() {
    const text = this.state.isOpen ? "hide comments" : "show comments";
    return (
      <div>
        <button onClick={this.toggleOpen}>{text}</button>
        {this.getBody()}
      </div>
    );
  }
}

export default CommentList;
