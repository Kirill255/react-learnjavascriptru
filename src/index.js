import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./containers/App";
import { articles } from "./fixtures";

import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App articles={articles} />
  </Provider>,
  document.getElementById("root")
);
