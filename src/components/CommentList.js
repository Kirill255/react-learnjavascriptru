import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Comment from "./Comment";
import Loader from "./Loader";
import CommentForm from "./CommentForm/CommentForm";
import LocalizedText from "./LocalizedText";
import toggleOpen from "../decorators/toggleOpen";
import { loadArticleComments } from "../action";

class CommentList extends Component {
  // описываем что хотим получить из контекста
  static contextTypes = {
    // это было помещено в контекст автоматически библиотеками react-redux и react-roter-dom
    store: PropTypes.object,
    router: PropTypes.object,
    // это мы поместили в контекст сами
    user: PropTypes.string
  };

  componentDidUpdate(prevProps) {
    const { isOpen, article, loadArticleComments } = this.props;
    if (!prevProps.isOpen && isOpen && !article.commentsLoading && !article.commentsLoaded) {
      loadArticleComments(article.id);
    }
  }

  render() {
    console.log("rerender: 4 CommentList");
    // если мы не опишим контекст, то this.context будет пустым объектом
    // console.log("---", this.context);

    const { article, isOpen, toggleOpen } = this.props;
    const text = isOpen ? "hide comments" : "show comments";

    return (
      <div>
        <h3>User: {this.context.user}</h3>

        <button onClick={toggleOpen}>
          <LocalizedText>{text}</LocalizedText>
        </button>
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
        <p>
          <LocalizedText>No comments yet</LocalizedText>
        </p>
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
  { loadArticleComments },
  null,
  { pure: false }
)(toggleOpen(CommentList));
