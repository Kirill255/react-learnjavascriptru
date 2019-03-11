import React, { Component } from "react";
import { ConnectedRouter } from "react-router-redux";
import { Route, NavLink, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";

import Articles from "../components/routes/Articles";
import NewArticle from "../components/routes/NewArticle";
import CommentsPage from "../components/routes/CommentsPage";
import NotFound from "../components/routes/NotFound";
import UserForm from "../components/UserForm";
import Filters from "../components/Filters";
import Counter from "../components/Counter";

import store from "../store";
import history from "../history";

import "./App.css";

class App extends Component {
  render() {
    return (
      // store в ConnectedRouter передавать не обязательно по идее см. README.md
      // решился баг после отката версии react-redux с 6.x.x на 5.x.x
      // <ConnectedRouter history={history} store={store}>
      <ConnectedRouter history={history}>
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
                Articles
              </NavLink>
            </div>
            <div>
              <NavLink to="/comments" activeStyle={{ color: "red", fontWeight: "bold" }}>
                CommentsPage
              </NavLink>
            </div>
          </div>
          <UserForm />

          <Switch>
            <Route path="/counter" component={Counter} />
            <Route path="/filters" component={Filters} />
            <Route path="/articles/new" component={NewArticle} />
            <Route path="/articles" component={Articles} />
            <Route path="/comments" component={CommentsPage} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

export default hot(module)(App);
