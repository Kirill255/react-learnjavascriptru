import { createSelector } from "reselect";

const filtersGetter = (state) => state.filters;
const articlesGetter = (state) => state.articles;

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
