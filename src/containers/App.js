import React, { Component } from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";
import ArticleList from "../components/ArticleList";
import UserForm from "../components/UserForm";

class App extends Component {
  static propTypes = {
    articles: PropTypes.array
  };

  render() {
    const { articles } = this.props;
    return (
      <div>
        <UserForm />
        <ArticleList articles={articles} />
      </div>
    );
  }
}

export default hot(module)(App);
