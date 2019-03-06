import React, { Component } from "react";
import { hot } from "react-hot-loader";

import ArticleList from "../components/ArticleList";
import UserForm from "../components/UserForm";
import Filters from "../components/Filters";
import Counter from "../components/Counter";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Counter />
        <UserForm />
        <Filters articles={[]} />
        <ArticleList />
      </div>
    );
  }
}

export default hot(module)(App);
