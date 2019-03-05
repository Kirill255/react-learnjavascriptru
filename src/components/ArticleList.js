import React, { Component } from "react";
import Article from "./Article";

class ArticleList extends Component {
  state = {
    openArticleId: null
  };

  toggleOpenArticle = (id) => (event) => {
    this.setState({ openArticleId: id });
  };

  render() {
    const { articles } = this.props;
    const { openArticleId } = this.state;
    const articleElements = articles.map((article) => (
      <li key={article.id}>
        <Article
          article={article}
          isOpen={article.id === openArticleId}
          toggleOpen={this.toggleOpenArticle(article.id)}
        />
      </li>
    ));

    return <ul>{articleElements}</ul>;
  }
}

export default ArticleList;
