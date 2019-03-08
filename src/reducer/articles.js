import { normalizedArticles } from "../fixtures";
import { DELETE_ARTICLE, ADD_COMMENT } from "../constants";
import { arrToMap } from "../helpers";

// сдесь я сделал копию данных с которой мы будем работать, чтобы не удалить статьи из реального массива, он нам ещё нужен, тоесть при перезагрузке страницы у нас снова будет набор всех статей, в реальной ситуации это не нужно конечно же
const defaultArticles = [...normalizedArticles];

export default (articlesState = arrToMap(defaultArticles), action) => {
  const { type, payload, randomId } = action;

  switch (type) {
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
