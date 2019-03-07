import React, { Component } from "react";
import PropTypes from "prop-types";
import Article from "./Article/Article";
import accordion from "../decorators/accordion";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  const { articles, filters } = state;
  const {
    selectedOption,
    dateRange: { from, to }
  } = filters;

  const filteredArticles = articles.filter((article) => {
    const published = Date.parse(article.date);
    return (
      (!selectedOption.length || selectedOption.includes(article.id)) &&
      (!from || !to || (published > from && published < to))
    );
  });

  return {
    articles: filteredArticles
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

  render() {
    const { articles, openArticleId, toggleOpenArticle } = this.props;
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

export default connect(mapStateToProps)(accordion(ArticleList));
