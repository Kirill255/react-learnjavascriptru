# react-learnjavascriptru

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

## React

1. `npm i -S react react-dom`

2. Add in entry point `src/index.js`

```js
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(<h1>Hello, world!</h1>, document.getElementById("root"));
```

## Other

1. Create new/or copy from old project `.editorconfig` and `.gitignore`

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
