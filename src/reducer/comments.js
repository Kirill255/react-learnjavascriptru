import { normalizedComments } from "../fixtures";
import {} from "../constants";

// сдесь я сделал копию данных с которой мы будем работать, чтобы не удалить статьи из реального массива, он нам ещё нужен, тоесть при перезагрузке страницы у нас снова будет набор всех статей, в реальной ситуации это не нужно конечно же
const defaultComments = [...normalizedComments];

export default (commentsState = defaultComments, action) => {
  const { type, payload } = action;

  switch (type) {
  }

  return commentsState;
};
