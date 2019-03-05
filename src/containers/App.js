import React, { Component } from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";
import ArticleList from "../components/ArticleList";

class App extends Component {
  static propTypes = {
    prop: PropTypes.array
  };

  render() {
    const { articles } = this.props;
    return (
      <div>
        <ArticleList articles={articles} />
      </div>
    );
  }
}

export default hot(module)(App);
