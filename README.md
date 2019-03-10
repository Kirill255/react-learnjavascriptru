# react-learnjavascriptru

## Related

https://github.com/romabelka/js_ru_08_06_17

## webpack and babel

1. `npm install --save-dev webpack webpack-cli webpack-dev-server`

2. `touch webpack.config.js`

```js
const path = require("path");

module.exports = {
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/js/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: path.resolve(__dirname, "src"),
        exclude: path.resolve(__dirname, "./node_modules")
      }
    ]
  }
};
```

3. Add scripts in package.json

```json
"scripts": {
  "dev": "webpack-dev-server --mode development --hot --inline --open",
  "build": "webpack --mode production"
}
```

4. `npm install --save-dev babel-loader @babel/core @babel/cli @babel/preset-env @babel/preset-react @babel/plugin-proposal-class-properties`, and `npm install --save @babel/polyfill`

5. `touch babel.config.js`

```js
const presets = ["@babel/preset-env", "@babel/preset-react"];
const plugins = ["@babel/plugin-proposal-class-properties"];

module.exports = { presets, plugins };
```

6. Create entry point `mkdir src` and `touch src/index.js`

```js
import "@babel/polyfill";
```

7. `touch index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>

  <body>
    <div id="root"></div>
    <script src="/js/bundle.js"></script>
  </body>
</html>
```

8. Если не запускается [webpack-dev-server](https://ru.stackoverflow.com/a/847972)

9. Если нужна поддержка стилей, `npm install --save-dev css-loader style-loader`, а в `webpack.config.js` добавить:

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
        // или
        // loaders: ["style-loader", "css-loader"]
      }
    ]
  }
};
```

## React

1. `npm i -S react react-dom`

2. Add in entry point `src/index.js`

```js
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(<h1>Hello, world!</h1>, document.getElementById("root"));
```

## react-transition-group

[guide](https://reactjs.org/docs/animation.html)

Можно использовать и v1(старую), но API различается существенно.

[v1](https://github.com/reactjs/react-transition-group/tree/v1-stable)

[v2](https://github.com/reactjs/react-transition-group)

## React-router

1. Если используется BrowserRouter (а не HashRouter) и у нас dev-режим, тоесть мы разрабатываем локально с webpack'ом, то нужно просто добавить настройку в webpack:

```js
devServer: {
  // ...
  // https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback
  historyApiFallback: true;
}
```

- а если это prod, то нужно позаботиться чтобы сервер отдавал на любой запрос index.html страницу, настройки зависят от сервера, смотря куда будете деплоить https://facebook.github.io/create-react-app/docs/deployment

## Other

1. Create new/or copy from old project `.editorconfig` and `.gitignore`

2. [react-hot-loader](https://toster.ru/q/437361), [Migrating from v3: React Hot Loader v4](https://github.com/gaearon/react-hot-loader#migrating-from-v3)

3. react-select, когда добаили фильтрацию статей, мы стали хранить в selectedOption вместо `[{value: 'something', label: 'something'}]` вот это `['something']`, мы стали хранить только id статей для более удобной фильтрации в ArticleList, но получили [Warning: Each child in an array or iterator should have a unique "key" prop](https://github.com/JedWatson/react-select/issues/2743#issuecomment-419532881). Я так и не нашёл решения вообще нигде в issues, но потом попробовал вместо value `<Select value={selectedOption} />`, установить setValue `<Select setValue={selectedOption} />` или `<Select selectOption={selectedOption} />` и это сработало.

4. В редьюсерах - уже есть все данные, нужно просто поменять состояния, в мидлаварах - сайд-эффекты, запросы на сервер, в экшенах - то, что вообще должно происходить, в селекторах - то, как мы что-то достаём из стора.

## ESLint

1. `npm i -D eslint babel-eslint eslint-plugin-react`

2. `touch .eslintrc`

```json
{
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parser": "babel-eslint",
  "globals": {
    "window": true,
    "document": true,
    "console": true
  },
  "rules": {
    "no-console": "off"
  }
}
```

## HW

##HT1 Реализовать список комментов для статьи, показывать/скрывать его по клику на кнопку, на которой должен меняться текст

##HT2.1 Вынести функционал аккордеона в декоратор
##HT2.2 Добавить в него возможность закрыть статью при повторном клике
##HT2.3 Написать для всего propTypes

##HT3.1 Подключить https://github.com/gpbl/react-day-picker с возможностью отображения промежутка дат, выводить этот промежуток на экран
##HT3.2 Создать в CommentList форму добавления нового коммента(user, text), без самого функционала добавления
##HT3.3 Добавить валидацию (подсвечивать красным инпут, если там < 5 или > 15 символов для имени и <20 или >50 для текста)

##HT4.1 Поместить состояние фильтров в стор
##HT4.2 Реалзовать фильрацию статей(попадают в промежуток дат и выбраны в комбобоксе), если фильтр не активен - не учитывать его

##HT5.1 Хранить статьи аналогично комментам(ключ-значение)
##HT5.2 Создать мидлвару для генерации рандомных id
##HT5.3 Реализовать функционал добавления коммента к статье

##HT6.1 Создать Record для комментария, хранить комменты в структуре аналогичной articles
##HT6.2 Реализовать загрузку комментов для статьи(при открытии списка), грузить один раз, показывать лоадер

##HT7.1 Реализовать роуты для пагинаци комментов(/comments/:page)
##HT7.2 Реализовать функционал пагианции комментов(по 5 на страницу, загружать каждую страницу только один раз), api: /api/comment?limit=5&offset=5

##HT8.1 Подготовить и прислать мне на почту список вопросов к последней встрече
##HT8.2 Починить баг с загрузкой статьи
##HT8.3 Реализовать локализацию, поместив словарь в контекст. С возможностью переключения языка
