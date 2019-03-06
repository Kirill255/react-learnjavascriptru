import React, { Component, PureComponent } from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import CommentList from "../CommentList";
import "./Article.css";

class Article extends PureComponent {
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

  // теперь нам не нужен shouldComponentUpdate, PureComponent под капотом делает тоже самое, и главное! для всех пропсов, и нам не нужно проверять все пропсы вручную по отдельности
  // заметка! прямо сейчас у нас render снова вызывается 7 раз (на каждую статью), потому что у нас функция toggleOpenArticle меняется, создаётся новая
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.isOpen !== this.props.isOpen;
  // }

  getBody() {
    const { article, isOpen } = this.props;
    if (!isOpen) return null;
    return (
      <CSSTransition classNames="article" timeout={{ enter: 500, exit: 300 }} appear>
        <section>
          {article.text}
          <button onClick={() => this.setState({ updateIndex: this.state.updateIndex + 1 })}>
            update
          </button>
          <CommentList comments={article.comments} key={this.state.updateIndex} />
        </section>
      </CSSTransition>
    );
  }

  render() {
    console.log("render");
    const { article, isOpen, toggleOpen } = this.props;
    return (
      <div>
        <h3>{article.title}</h3>
        <button onClick={toggleOpen}>{isOpen ? "close" : "open"}</button>
        <TransitionGroup>{this.getBody()}</TransitionGroup>
      </div>
    );
  }
}

export default Article;
