import { DELETE_ARTICLE, ADD_COMMENT, LOAD_ALL_ARTICLES } from "../constants";
import { arrToMap } from "../helpers";

export default (articlesState = {}, action) => {
  const { type, payload, randomId, response } = action;

  switch (type) {
    case LOAD_ALL_ARTICLES:
      return arrToMap(response);

    case DELETE_ARTICLE:
      const tmpArticlesState = { ...articlesState };
      delete tmpArticlesState[payload.id];
      return tmpArticlesState;

    case ADD_COMMENT:
      const article = articlesState[payload.articleId];
      return {
        ...articlesState,
        [payload.articleId]: {
          ...article,
          comments: (article.comments || []).concat(randomId)
        }
      };
  }

  return articlesState;
};
