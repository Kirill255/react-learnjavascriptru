import React, { Component } from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";

import ArticleList from "../components/ArticleList";
import UserForm from "../components/UserForm";
import Filters from "../components/Filters";
import "./App.css";

class App extends Component {
  static propTypes = {
    articles: PropTypes.array
  };

  render() {
    const { articles } = this.props;

    return (
      <div className="app">
        <UserForm />
        <Filters articles={articles} />
        <ArticleList articles={articles} defaultOpenId={articles[0].id} />
      </div>
    );
  }
}

export default hot(module)(App);
