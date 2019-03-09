import React, { Component } from "react";
import PropTypes from "prop-types";
import Article from "./Article/Article";
import Loader from "./Loader";
import accordion from "../decorators/accordion";
import { connect } from "react-redux";
import { filtratedArticlesSelector } from "../selectors";
import { loadAllArticles } from "../action";

const mapStateToProps = (state) => {
  return {
    articles: filtratedArticlesSelector(state),
    loading: state.articles.loading,
    loaded: state.articles.loaded
  };
};

class ArticleList extends Component {
  static propTypes = {
    // from connect
    articles: PropTypes.array.isRequired,
    //from accordion decorator
    openArticleId: PropTypes.string,
    toggleOpenArticle: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { loading, loaded, loadAllArticles } = this.props;
    if (!loaded || !loading) {
      loadAllArticles();
    }
  }

  render() {
    console.log("render articles list");
    const { articles, openArticleId, toggleOpenArticle, loading } = this.props;

    if (loading) return <Loader />;

    const articleElements = articles.map((article) => (
      <li key={article.id}>
        <Article
          article={article}
          isOpen={article.id === openArticleId}
          toggleOpen={toggleOpenArticle(article.id)}
        />
      </li>
    ));

    return <ul>{articleElements}</ul>;
  }
}

export default connect(
  mapStateToProps,
  { loadAllArticles }
)(accordion(ArticleList));
