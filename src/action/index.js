import { INCREMENT, DELETE_ARTICLE, CHANGE_SELECTION } from "../constants";

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
