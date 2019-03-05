import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentList from "./CommentList";
import toggleOpen from "../decorators/toggleOpen";

class Article extends Component {
  static propTypes = {
    article: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string
    }).isRequired
  };

  getBody() {
    const { article, isOpen } = this.props;
    if (!isOpen) return null;
    return (
      <section>
        {article.text}
        <CommentList comments={article.comments} />
      </section>
    );
  }

  // вынесли в отдельную функцию, потому что в прошлом варианте при каждом вызове метода render() создавалась новая функция, и эта анонимная функция вызывалась дважды, один раз с null, чтобы очистить ссылку за собой на предыдущую функцию, и потом второй раз с новой функцией
  containerRef = (node) => {
    // например можем сохранить ссылку на нашу node
    // this.container = node;
    console.log(node);
  };

  render() {
    const { article, isOpen, toggleOpen } = this.props;
    return (
      <div ref={this.containerRef}>
        <h3>{article.title}</h3>
        <button onClick={toggleOpen}>{isOpen ? "close" : "open"}</button>
        {this.getBody()}
      </div>
    );
  }
}

export default toggleOpen(Article);
