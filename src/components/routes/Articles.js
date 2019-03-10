import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import ArticleList from "../ArticleList";
import Article from "../Article/Article";

export default class Articles extends Component {
  static propTypes = {};

  // https://reacttraining.com/react-router/web/api/match
  // getArticle = (...args) => {
  //   console.log("---", args);
  //   return <h1>Article</h1>;
  // };

  // важно передать key, чтобы это считалось новым компонентом
  getArticle = ({ match }) => {
    const { id } = match.params;
    return <Article id={id} isOpen key={id} />;
  };

  // https://reacttraining.com/react-router/web/api/Route/render-func
  // render - рендерит когда маршрут совпадает, children - рендерит в любом случае, это позволяет гибко настривать ui, например если "/articles" - мы покажем "Please select article", в другом случае "Article page:", а в другом случае это когда у нас нет точного соответствия "/articles", тоесть на пример "/articles/:id"
  getIndex = ({ match }) => {
    if (!match) return <h2>Article page:</h2>;
    return <h2>Please select article</h2>;
  };

  render() {
    return (
      <div>
        <ArticleList />
        <Route path="/articles" children={this.getIndex} exact />
        <Route path="/articles/:id" render={this.getArticle} />
      </div>
    );
  }
}
