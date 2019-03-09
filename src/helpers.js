const { Map } = require("immutable");

// export const arrToMap = (arr) => {
//   return arr.reduce((acc, item) => {
//     acc.set(item.id,  new Map(item));
//     return acc;
//   }, new Map({}));
// };

// в одну строку es6
// каждую статью тоже заворачиваем в Map
// export const arrToMap = (arr) =>
//   arr.reduce((acc, item) => acc.set(item.id, new Map(item)), new Map({}));

// когда мы завернули каждую статью тоже в map, то чтобы получить данные из статьи (id, title), нужно переписать всё наше приложение на get методы, т.к. теперь это Map структура и она отдаёт данные по ключ-значение, тоесть сейчас мы используем грубо говоря вот так store.getState().articles.get("56c782f18990ecf954f6e027").title, а нужно будет вот так store.getState().articles.get("56c782f18990ecf954f6e027").get("title"), чтобы этого не делать, в immutable есть такая структура как Record, она аналогична Map(тоже ключ-значение), но при инициализации которой мы можем описать наши поля(нашу схему/модель данных) и потом к ним обращаться как раньше напрямую, не вызывая функцию get

export const arrToMap = (arr, DataRecord = Map) =>
  arr.reduce((acc, item) => acc.set(item.id, new DataRecord(item)), new Map({}));

export const mapToArr = (obj) => {
  return obj.valueSeq().toArray();
};
