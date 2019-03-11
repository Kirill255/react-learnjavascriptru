import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Comment from "./Comment";
import Loader from "./Loader";
import CommentForm from "./CommentForm/CommentForm";
import toggleOpen from "../decorators/toggleOpen";
import { loadArticleComments } from "../action";

class CommentList extends Component {
  // описываем что хотим получить из контекста
  static contextTypes = {
    store: PropTypes.object,
    router: PropTypes.object
  };

  componentDidUpdate(prevProps) {
    const { isOpen, article, loadArticleComments } = this.props;
    if (!prevProps.isOpen && isOpen && !article.commentsLoading && !article.commentsLoaded) {
      loadArticleComments(article.id);
    }
  }

  render() {
    // если мы не опишим контекст, то this.context будет пустым объектом
    console.log("---", this.context);

    const { article, isOpen, toggleOpen } = this.props;
    const text = isOpen ? "hide comments" : "show comments";

    return (
      <div>
        <button onClick={toggleOpen}>{text}</button>
        {getBody({ isOpen, article })}
      </div>
    );
  }
}

CommentList.propTypes = {
  article: PropTypes.object,
  //from toggleOpen decorator
  isOpen: PropTypes.bool,
  toggleOpen: PropTypes.func
};

// handle function
function getBody({ isOpen, article: { id, comments = [], commentsLoaded, commentsLoading } }) {
  if (!isOpen) return null;
  if (commentsLoading) return <Loader />;
  if (!commentsLoaded) return null;

  if (!comments.length) {
    return (
      <div>
        <p>No comments yet</p>
        <CommentForm articleId={id} />
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
      <CommentForm articleId={id} />
    </div>
  );
}

export default connect(
  null,
  { loadArticleComments }
)(toggleOpen(CommentList));
