import React, { Component } from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { hot } from "react-hot-loader";

import ArticleList from "../components/ArticleList";
import UserForm from "../components/UserForm";
import Filters from "../components/Filters";
import Counter from "../components/Counter";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <div>
            <h2>Main menu</h2>
            <div>
              <Link to="/">Home</Link>
            </div>
            <div>
              <Link to="/counter">Counter</Link>
            </div>
            <div>
              <Link to="/filters">Filters</Link>
            </div>
            <div>
              <Link to="/articles">ArticleList</Link>
            </div>
          </div>
          <UserForm />
          <Route path="/counter" component={Counter} />
          <Route path="/filters" component={Filters} />
          <Route path="/articles" component={ArticleList} />
          {/*
          <Counter />
          <Filters />
          <ArticleList />
          */}
        </div>
      </Router>
    );
  }
}

export default hot(module)(App);
