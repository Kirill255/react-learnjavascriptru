const { Map, Record, OrderedMap } = require("immutable");
import {
  DELETE_ARTICLE,
  ADD_COMMENT,
  LOAD_ALL_ARTICLES,
  START,
  SUCCESS,
  LOAD_ARTICLE
} from "../constants";
import { arrToMap } from "../helpers";

const ArticleRecord = Record({
  id: undefined,
  title: "",
  text: undefined,
  comments: [],
  loading: false
});

// const defaultArticledState = new Map({
//   loading: false,
//   loaded: false,
//   articles: new OrderedMap({})
// });

// поменяли Map структуру на Record, чтобы не использовать get, т.к. мы добавили уровень вложенности, нужно изменить все места где это используется, раньше у нас хранились статьи стразу в сторе, примерно так store.articles, то теперь store.articles.entities
const ReducerState = Record({
  loading: false,
  loaded: false,
  entities: new OrderedMap({})
});

const defaultArticlesState = new ReducerState();

export default (articlesState = defaultArticlesState, action) => {
  const { type, payload, randomId, response } = action;

  switch (type) {
    case LOAD_ALL_ARTICLES + START:
      return articlesState.set("loading", true);

    case LOAD_ALL_ARTICLES + SUCCESS:
      return articlesState
        .set("entities", arrToMap(response, ArticleRecord))
        .set("loading", false)
        .set("loaded", true);

    case LOAD_ARTICLE + START:
      return articlesState.setIn(["entities", payload.id, "loading"], true);

    case LOAD_ARTICLE + SUCCESS:
      return articlesState.setIn(["entities", payload.id], new ArticleRecord(payload.response));

    case DELETE_ARTICLE:
      return articlesState.deleteIn(["entities", payload.id]);

    case ADD_COMMENT:
      // такой вариант подходит только для верхнего уровня вложенности, так обновится поле comments: randomId, а нам нужно comments: [id1, id2, ..., randomId]
      // return articlesState.update(payload.articleId, (article) => article.set("comments", randomId));

      // [где обновить? в "entities", в "entities" есть payload.articleId, что обновить? поле "comments"], дальше получаем это поле (comments) => обновляем
      return articlesState.updateIn(["entities", payload.articleId, "comments"], (comments) =>
        comments.concat(randomId)
      );
  }

  return articlesState;
};
