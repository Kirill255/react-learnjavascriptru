import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import ArticleList from "./components/ArticleList";
import { articles } from "./fixtures";

// Вызов метода render для первоначального монтажа приложения в DOM
ReactDOM.render(
  <AppContainer>
    <ArticleList articles={articles} />
  </AppContainer>,
  document.getElementById("root")
);

// Вызов метода render при регистрации изменений плагином HMR
if (module.hot) {
  module.hot.accept(() => {
    ReactDOM.render(
      <AppContainer>
        <ArticleList articles={articles} />
      </AppContainer>,
      document.getElementById("root")
    );
  });
}
