import React, { Component } from "react";
import PropTypes from "prop-types";
import Article from "./Article/Article";
import accordion from "../decorators/accordion";
import { connect } from "react-redux";
import { filtratedArticlesSelector } from "../selectors";

const mapStateToProps = (state) => {
  return {
    articles: filtratedArticlesSelector(state)
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
    console.log("render articles list");
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
