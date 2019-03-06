import { articles } from "../fixtures";
import { DELETE_ARTICLE } from "../constants";

// сдесь я сделал копию данных с которой мы будем работать, чтобы не удалить статьи из реального массива, он нам ещё нужен, тоесть при перезагрузке страницы у нас снова будет набор всех статей, в реальной ситуации это не нужно конечно же
const defaultArticles = [...articles];

export default (articlesState = defaultArticles, action) => {
  const { type, payload } = action;

  switch (type) {
    case DELETE_ARTICLE:
      return articlesState.filter((article) => article.id !== payload.id);
  }

  return articlesState;
};
