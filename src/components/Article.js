import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentList from "./CommentList";

class Article extends Component {
  static propTypes = {
    article: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string
    }).isRequired,
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func
  };

  state = {
    updateIndex: 0
  };

  // обычно реакт старается переиспользовать компоненты, если это возможно, но мы можем задать обратное поведение с помощью атрибута key, тоесть если key изменился значит это уже другой компонент, значит его нужно создать заново https://stackoverflow.com/a/35004739
  getBody() {
    const { article, isOpen } = this.props;
    if (!isOpen) return null;
    return (
      <section>
        {article.text}
        <button onClick={() => this.setState({ updateIndex: this.state.updateIndex + 1 })}>
          update
        </button>
        <CommentList comments={article.comments} key={this.state.updateIndex} />
      </section>
    );
  }

  render() {
    const { article, isOpen, toggleOpen } = this.props;
    return (
      <div>
        <h3>{article.title}</h3>
        <button onClick={toggleOpen}>{isOpen ? "close" : "open"}</button>
        {this.getBody()}
      </div>
    );
  }
}

export default Article;
