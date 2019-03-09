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
  FAIL
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
      .then((res) => res.json())
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
      });
  }, 1000);
};
