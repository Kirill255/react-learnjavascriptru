import React, { Component } from "react";
import { findDOMNode } from "react-dom";
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

  constructor(props) {
    super(props);

    this.containerRef = React.createRef();
    this.commentsRef = React.createRef();
  }

  componentDidMount() {
    console.log(this.containerRef.current);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.commentsRef.current); // компонент
    console.log(findDOMNode(this.commentsRef.current)); // его реальная DOM-нода
  }

  // с коллбэком
  // commentsRef = (node) => {
  //   console.log(node);
  //   console.log(findDOMNode(node));
  // };

  getBody() {
    const { article, isOpen } = this.props;
    if (!isOpen) return null;
    return (
      <section>
        {article.text}
        <CommentList ref={this.commentsRef} comments={article.comments} />
      </section>
    );
  }

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
