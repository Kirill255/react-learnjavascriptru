import { normalizedArticles } from "../fixtures";
import { DELETE_ARTICLE } from "../constants";

// сдесь я сделал копию данных с которой мы будем работать, чтобы не удалить статьи из реального массива, он нам ещё нужен, тоесть при перезагрузке страницы у нас снова будет набор всех статей, в реальной ситуации это не нужно конечно же
const defaultArticles = [...normalizedArticles];

const articlesMap = defaultArticles.reduce((acc, article) => {
  acc[article.id] = article;
  return acc;
}, {});

export default (articlesState = articlesMap, action) => {
  const { type, payload } = action;

  switch (type) {
    case DELETE_ARTICLE:
      const tmpArticlesState = { ...articlesState };
      delete tmpArticlesState[payload.id];
      return tmpArticlesState;
  }

  return articlesState;
};
