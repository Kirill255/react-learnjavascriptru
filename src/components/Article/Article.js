import React, { Component, PureComponent } from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import CommentList from "../CommentList";
import Loader from "../Loader";
import { connect } from "react-redux";
import { deleteArticle, loadArticle } from "../../action";
import "./Article.css";

const mapDispatchToProps = (dispatch) => {
  return {
    handleDelete: (id) => dispatch(deleteArticle(id)),
    handleLoadArticle: (id) => dispatch(loadArticle(id))
  };
};

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

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   const { isOpen, handleLoadArticle, article } = nextProps;
  //   // если сейчас статья закрыта и нажали на кнопку открыть, и ещё нет текста, тоесть до этого её ещё не загружали, тоесть статья могла быть уже загружена, просто закрыта, а также если в данный момент уже не загружается, тоесть могут просто кликать по кнопке туда-сюда
  //   // это просто оптимизации, можно обойтись и более простым условием if (isOpen) {}
  //   if (!this.props.isOpen && isOpen && !article.text && !article.loading) {
  //     handleLoadArticle(article.id);
  //   }
  // }

  // UNSAFE_componentWillReceiveProps - legacy method
  componentDidUpdate(prevProps) {
    const { isOpen, handleLoadArticle, article } = this.props;
    if (!prevProps.isOpen && isOpen && !article.text && !article.loading) {
      handleLoadArticle(article.id);
    }
  }

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
          <CommentList article={article} key={this.state.updateIndex} />
        </section>
      </CSSTransition>
    );
  }

  render() {
    console.log("render");
    const { article, isOpen, toggleOpen, handleDelete } = this.props;

    if (article.loading) return <Loader />;

    return (
      <div>
        <h3>{article.title}</h3>
        <button onClick={toggleOpen}>{isOpen ? "close" : "open"}</button>
        <button onClick={() => handleDelete(article.id)}>delete</button>
        <TransitionGroup>{this.getBody()}</TransitionGroup>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Article);
