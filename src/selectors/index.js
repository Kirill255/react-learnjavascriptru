import { createSelector } from "reselect";

const filtersGetter = (state) => state.filters;
const articlesGetter = (state) => state.articles;

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

    return articles.filter((article) => {
      const published = Date.parse(article.date);
      return (
        (!selectedOption.length || selectedOption.includes(article.id)) &&
        (!from || !to || (published > from && published < to))
      );
    });
  }
);

// сделали селектор для комментов, но так получается, что никакой оптимизации не получилось, reselect работает по приницу - запоминает один последний вызов, соответственно если у нас поменялись аргументы с прошлого вызова, он забудет прошлый результат и посчитает всё заново
// сейчас у нас рядом рендерится сразу несколько инстансов коммента(зависит от кол-ва комментариев, например 5), а это значит что селектор вызовется для первого коммента с id=1(для примера), селектор посчитает результат и запомнит, но дальше селектор сразу же вызовется для следующего коммента, аргумент поменяется(тоесть наш id), он будет уже id=2, старый результат затрётся и посчитается новый, так произойдёт для каждого коммента, тоесть по факту оптимизировать не получилось, у нас всё время селектор пересчитывается
export const commentSelector = createSelector(
  commentsGetter,
  idGetter,
  (comments, id) => {
    console.log("---", "getting comment", id);

    return comments.find((comment) => comment.id === id);
  }
);
