import { push, replace } from "react-router-redux";

import {
  INCREMENT,
  DELETE_ARTICLE,
  CHANGE_SELECTION,
  CHANGE_DATE_RANGE,
  RESET_DATE_RANGE,
  ADD_COMMENT,
  LOAD_ALL_ARTICLES,
  LOAD_ARTICLE,
  START,
  SUCCESS,
  FAIL,
  LOAD_ARTICLE_COMMENTS,
  LOAD_COMMENTS_FOR_PAGE
} from "../constants";

export const increment = () => {
  return {
    type: INCREMENT
  };
};

export const deleteArticle = (id) => {
  return {
    type: DELETE_ARTICLE,
    payload: { id }
  };
};

export const changeSelection = (selectedOption) => {
  return {
    type: CHANGE_SELECTION,
    payload: { selectedOption }
  };
};

export const changeDateRange = (dateRange) => {
  return {
    type: CHANGE_DATE_RANGE,
    payload: { dateRange }
  };
};

export const resetDateRange = () => {
  return {
    type: RESET_DATE_RANGE
  };
};

export const addComment = (comment, articleId) => {
  return {
    type: ADD_COMMENT,
    payload: { comment, articleId },
    generateId: true
  };
};

export const loadAllArticles = () => {
  return {
    type: LOAD_ALL_ARTICLES,
    callAPI: "/api/article"
  };
};

// могли бы сделать так, но сделаем для примера через redux-thunk
// export const loadArticle = (id) => {
//   return {
//     type: LOAD_ARTICLE,
//     callAPI: `/api/article/${id}`
//   };
// };

export const loadArticle = (id) => (dispatch) => {
  dispatch({
    type: LOAD_ARTICLE + START,
    payload: { id }
  });

  setTimeout(() => {
    fetch(`/api/article/${id}`)
      .then((res) => {
        // теперь мы будем попадать в блок catch если придёт 4xx
        if (res.status >= 400) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((response) => {
        dispatch({
          type: LOAD_ARTICLE + SUCCESS,
          payload: { id, response }
        });
      })
      .catch((err) => {
        dispatch({
          type: LOAD_ARTICLE + FAIL,
          payload: { id, err }
        });
        // в котором редиректимся на /error
        // dispatch(push("/error"));
        // или так, так даже лучше, т.к. мы перезаписываем роут приведший к ошибке
        dispatch(replace("/error"));
        // без интеграции "react-router-redux" могло бы выглядеть так, конечно нужно сначала подключить import history from "../history", а "react-router-redux" просто оверхэд и незря он deprecated
        // history.push("/error")
        // или
        // history.replace("/error")
      });
  }, 1000);
};

export const loadArticleComments = (articleId) => {
  return {
    type: LOAD_ARTICLE_COMMENTS,
    payload: { articleId },
    callAPI: `/api/comment?article=${articleId}`
  };
};

export const checkAndLoadCommentsForPage = (page) => (dispatch, getState) => {
  const {
    comments: { pagination }
  } = getState();
  if (pagination.getIn([page, "loading"]) || pagination.getIn([page, "ids"])) return;

  dispatch({
    type: LOAD_COMMENTS_FOR_PAGE,
    payload: { page },
    callAPI: `/api/comment?limit=5&offset=${(page - 1) * 5}`
  });
};
