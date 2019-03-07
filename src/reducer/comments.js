import { normalizedComments } from "../fixtures";
import {} from "../constants";

// сдесь я сделал копию данных с которой мы будем работать, чтобы не удалить статьи из реального массива, он нам ещё нужен, тоесть при перезагрузке страницы у нас снова будет набор всех статей, в реальной ситуации это не нужно конечно же
const defaultComments = [...normalizedComments];

// для производительности не очень хорошо каждый раз проходиться по маасиву комментариев, чтобы найти нужный, поэтому лучше хранить данные в другой структуре, например в объекте или map, в структуре ключ-значение, где мы можем достать любой нужный коммент просто по ключу, а не перебирая всю коллекцию(массив), а он может быть очень большим
const commentsMap = defaultComments.reduce((acc, comment) => {
  acc[comment.id] = comment;
  return acc;
}, {});

export default (commentsState = commentsMap, action) => {
  const { type, payload } = action;

  switch (type) {
  }

  return commentsState;
};
