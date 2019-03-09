import React, { Component } from "react";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
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
              <NavLink exact to="/" activeStyle={{ color: "red", fontWeight: "bold" }}>
                Home
              </NavLink>
            </div>
            <div>
              <NavLink to="/counter" activeStyle={{ color: "red", fontWeight: "bold" }}>
                Counter
              </NavLink>
            </div>
            <div>
              <NavLink to="/filters" activeStyle={{ color: "red", fontWeight: "bold" }}>
                Filters
              </NavLink>
            </div>
            <div>
              <NavLink to="/articles" activeStyle={{ color: "red", fontWeight: "bold" }}>
                ArticleList
              </NavLink>
            </div>
          </div>
          <UserForm />
          <Route path="/counter" component={Counter} />
          <Route path="/filters" component={Filters} />
          <Route path="/articles" component={ArticleList} />
        </div>
      </Router>
    );
  }
}

export default hot(module)(App);
