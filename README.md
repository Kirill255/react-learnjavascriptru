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

## react-router-redux

For react-router 2.x and 3.x [react-router-redux 4.x](https://www.npmjs.com/package/react-router-redux) `npm i react-router-redux`

For react-router 4.x [react-router-redux 5.x](https://www.npmjs.com/package/react-router-redux/v/5.0.0-alpha.9) `npm i react-router-redux@next`

А вообще эта библиотека устарела(но её всё ещё многие используют - 1.6m downloads!), и они советуют использовать [connected-react-router](https://github.com/supasate/connected-react-router)

**Заметка**: стор в ConnectedRouter передавать не обязательно по идее, как написано в доке "ConnectedRouter will use the store from Provider automatically", он автоматически получает доступ к стору через Provider, но также есть возможность напрямую передать стор как пропс `<ConnectedRouter history={history} store={store}>`, https://github.com/reactjs/react-router-redux/issues/609#issuecomment-339677259, дак вот в моём случае автоматически стор почему-то не подтягивался через Provider, поэтому я передал его как пропс, возможно из-за структуры проекта, возможно это нужно делать в одном компоненте, или возможно связанно с версиямии пакетов react, redux, react-router, react-router-redux, т.к. react-router-redux уже deprecated!

```jsx
ReactDOM.render(
  <Provider store={store}>
    // ConnectedRouter will use the store from Provider automatically
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
```

**UPDATE:** решился баг после отката версии react-redux с 6.x.x на 5.x.x

## react-redux

При любом изменении в приложении запускается обновление дерева, например в нашем случае когда мы сделали setState в компоненте App в методе handleUserChange, тоесть когда мы вводим что-то в инпут, пошло обновление дерева сверху вниз, если в каком-то месте дерево не перестраивается, как в нашем случае мы пишем что-то в инпут, но имя в CommentList не меняется, значит в CommentList не пришёл сигнал. Как такое могло произойти? Что дерево начало перестроение нашего родителя, но кто-то из дочерних компонентов решил не перестраиваться? Это значит что где-то по дороге у нас попался shouldComponentUpdate(). Это единственная причина что дерево начало перестраиваться, а оно у нас начало перестраиваться как видно на gif, App->Articles-> и всё! В Article->CommentList уже не дошло! Это значит что где-то по дороге между App и CommentList есть shouldComponentUpdate(). Даже если мы явно не используем в этих компонентах или shouldComponentUpdate() или PureComponent, то есть ещё одно место, так называемый декоратор connect() из react-redux под капотом используем shouldComponentUpdate()! Как видим из gif сигнал теряется между Articles->Article, в Article уже не приходит, значит идём в Article и ищем в чём проблема, оказывается у нас там используется PureComponent, меняем его на Component а также есть connect(), у которого есть 4 параметра `function connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)`, обычно используются только первые два, дак вот в 4ом параметре в [options](https://react-redux.js.org/api/connect#options-object) мы можем переопределить поведение для компонента, а именно отключить shouldComponentUpdate, передав `{pure: false}`, дальше идём в CommentList, там у нас тоже connect(), проделываем тоже самое, в итоге получится что-то вроде этого:

```js
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(Article);
```

Теперь сигнал должен проходить дальше, дерео будет перестраиваться.

![react-redux](https://user-images.githubusercontent.com/24504648/54149154-9cc3fc00-4446-11e9-8426-ae9e3d602d7d.gif)

## Other

1. Create new/or copy from old project `.editorconfig` and `.gitignore`

2. [react-hot-loader](https://toster.ru/q/437361), [Migrating from v3: React Hot Loader v4](https://github.com/gaearon/react-hot-loader#migrating-from-v3)

3. react-select, когда добаили фильтрацию статей, мы стали хранить в selectedOption вместо `[{value: 'something', label: 'something'}]` вот это `['something']`, мы стали хранить только id статей для более удобной фильтрации в ArticleList, но получили [Warning: Each child in an array or iterator should have a unique "key" prop](https://github.com/JedWatson/react-select/issues/2743#issuecomment-419532881). Я так и не нашёл решения вообще нигде в issues, но потом попробовал вместо value `<Select value={selectedOption} />`, установить setValue `<Select setValue={selectedOption} />` или `<Select selectOption={selectedOption} />` и это сработало.

4. В редьюсерах - уже есть все данные, нужно просто поменять состояния, в мидлаварах - сайд-эффекты, запросы на сервер, в экшенах - то, что вообще должно происходить, в селекторах - то, как мы что-то достаём из стора.

5. Fetch API and 4xx+ error https://github.com/github/fetch/issues/155, https://github.com/whatwg/fetch/issues/18, по-умолчанию fetch не считает 4xx+ ошибками, он разрешается как fulfilled promise и не попадает в блок catch, в блок catch попадают только выброшенные исключения exceptions.

6. Context API, пришлось откатить версию react-redux с 6.x.x на 5.x.x, потому что context.store был undefined https://github.com/supasate/connected-react-router/issues/252#issuecomment-466020132, возможно потому что мы используем старый синтаксис контекста, а они в версии 6.x.x используют уже новый, кстати старый синтаксис Legacy Context, перестанет работать в 17+ react, поэтому советую использовать новый синтаксис, вместо того чтобы откатывать версии библиотек.

7. HT8.2 Когда мы переходим по ссылками, то у нас запросы идут по очереди, тоесть перешли на http://localhost:8080/articles то подгрузились все статьи, перешли на конкретную статью http://localhost:8080/articles/56c782f1e17f4f9311dfaa2c то подгрузилась одна статья

![requests](https://user-images.githubusercontent.com/24504648/54187415-89547780-44be-11e9-8b68-4850f6a44f90.gif)

- У нас в логике прописано что новый результат просто перезатирает старый `articlesState.set("entities", arrToMap(response, ArticleRecord))`, тоесть пришол список статей, значит в сторе список статей, пришла одна статья, значит в сторе одна статья. Точнее конечно как на рисунке, у нас есть список статей(/articles), но статей неполных без текста, т.к. он нам не нужен в этот момент, когда мы переходим на конкретную статью(/articles/:id) то подтягивается уже полная статья с текстом, и заменяется в изначальном списке, запись полностью удаляется и вставляется новая, почти такая же только с текстом

![data](https://user-images.githubusercontent.com/24504648/54190960-fae3f400-44c5-11e9-86bc-46377822b118.png)

- Но! Что если мы перейдём сразу по адресу статьи http://localhost:8080/articles/56c782f1e17f4f9311dfaa2c, прямой ссылкой или при перезагрузке странице, то у нас отправится сразу два запроса одновременно, и по логике они перезатрут друг друга, кто кого это уже зависит от того какой запрос придёт раньше, тоесть может получится так, что сначала придёт запрос целой статьи с текстом, а потом придёт запрос со списком неполных статей.

![bug](https://user-images.githubusercontent.com/24504648/54187954-b9504a80-44bf-11e9-8452-bdb73698269c.png)

- Решение, нужно переписать логику в сторе: `articlesState.update("entities", (entities) => arrToMap(response, ArticleRecord).merge(entities))`, будем не перезатирать стор новым результатом, а обновлять и мёржить результаты

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
