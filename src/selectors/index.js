import { createSelector } from "reselect";
import { mapToArr } from "../helpers";

const filtersGetter = (state) => state.filters;
const articlesGetter = (state) => state.articles.entities;

const commentsGetter = (state) => state.comments;
const idGetter = (state, props) => props.id;

export const filtratedArticlesSelector = createSelector(
  articlesGetter,
  filtersGetter,
  (articles, filters) => {
    const {
      selectedOption,
      dateRange: { from, to }
    } = filters;
    console.log("---", "recomputing filtration");

    return mapToArr(articles).filter((article) => {
      const published = Date.parse(article.date);
      return (
        (!selectedOption.length || selectedOption.includes(article.id)) &&
        (!from || !to || (published > from && published < to))
      );
    });
  }
);

// проблема была в том что для 5 разных инстансов вызывается один и тот же метод, соответственно у нас постоянно перезаписывается предыдущий результат, толку от селектора никакого
// чтобы избежать этой проблемы нам нужно создавать селектор не один на весь класс сразу же, а создавать селектор для каждого инстанса этого класса, чтобы для каждого из этих 5и комментарие у нас создавался свой селектор, который запоминал бы свой результат
export const commentSelectorFactory = () =>
  createSelector(
    commentsGetter,
    idGetter,
    (comments, id) => {
      console.log("---", "getting comment", id);

      return comments[id];
    }
  );
