import {
  INCREMENT,
  DELETE_ARTICLE,
  CHANGE_SELECTION,
  CHANGE_DATE_RANGE,
  RESET_DATE_RANGE,
  ADD_COMMENT
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
