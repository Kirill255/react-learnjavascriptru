import React, { Component, PureComponent } from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import CommentList from "../CommentList";
import Loader from "../Loader";
import LocalizedText from "../LocalizedText";
import { connect } from "react-redux";
import { deleteArticle, loadArticle } from "../../action";
import "./Article.css";

const mapDispatchToProps = (dispatch) => {
  return {
    handleDelete: (id) => dispatch(deleteArticle(id)),
    handleLoadArticle: (id) => dispatch(loadArticle(id))
  };
};

class Article extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func,
    //  from connect
    article: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string
    })
  };

  state = {
    updateIndex: 0
  };

  // также мы задали статьям key, чтобы реакт считал компонент новым и заменял его целиком
  componentDidMount() {
    const { id, article, handleLoadArticle } = this.props;

    if (!article || (!article.text && !article.loading)) {
      handleLoadArticle(id);
    }
  }

  getBody() {
    const { article, isOpen } = this.props;
    if (!isOpen) return null;
    if (article.loading) return <Loader />;

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
    console.log("rerender: 3 Article");

    const { article, isOpen, toggleOpen, handleDelete } = this.props;
    if (!article) return null;

    return (
      <div>
        <h3>{article.title}</h3>
        <button onClick={toggleOpen}>{isOpen ? "close" : "open"}</button>
        <button onClick={() => handleDelete(article.id)}>
          <LocalizedText>delete me</LocalizedText>
        </button>
        <TransitionGroup>{this.getBody()}</TransitionGroup>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    article: state.articles.entities.get(ownProps.id)
  }),
  mapDispatchToProps,
  null,
  { pure: false }
)(Article);
