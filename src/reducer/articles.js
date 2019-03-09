const { Map, Record } = require("immutable");
import { DELETE_ARTICLE, ADD_COMMENT, LOAD_ALL_ARTICLES } from "../constants";
import { arrToMap } from "../helpers";

const ArticleRecord = Record({
  id: undefined,
  title: "",
  text: undefined,
  comments: []
});

const defaultArticledState = new Map({});

export default (articlesState = defaultArticledState, action) => {
  const { type, payload, randomId, response } = action;

  switch (type) {
    case LOAD_ALL_ARTICLES:
      return arrToMap(response, ArticleRecord);

    case DELETE_ARTICLE:
      return articlesState.delete(payload.id);

    case ADD_COMMENT:
      // такой вариант подходит только для верхнего уровня вложенности, так обновится поле comments: randomId, а нам нужно comments: [id1, id2, ..., randomId]
      // return articleState.update(payload.articleId, (article) => article.set("comments", randomId));

      // [где обновить? в payload.articleId, что обновить? поле "comments"], дальше получаем это поле (comments) => обновляем
      return articleState.updateIn([payload.articleId, "comments"], (comments) =>
        comments.concat(randomId)
      );
  }

  return articlesState;
};
