import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import Loader from "./Loader";
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
    toggleOpenArticle: PropTypes.func
  };

  componentDidMount() {
    const { loading, loaded, loadAllArticles } = this.props;
    if (!loaded && !loading) {
      loadAllArticles();
    }
  }

  render() {
    const { articles, loading } = this.props;

    if (loading) return <Loader />;

    const articleElements = articles.map((article) => (
      <li key={article.id}>
        <NavLink to={`/articles/${article.id}`} activeStyle={{ color: "red" }}>
          {article.title}
        </NavLink>
      </li>
    ));

    return <ul>{articleElements}</ul>;
  }
}

export default connect(
  mapStateToProps,
  { loadAllArticles }
)(ArticleList);
