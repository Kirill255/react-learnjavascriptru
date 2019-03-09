const { Map, OrderedMap } = require("immutable");

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
// OrderedMap это тот же Map, только сохраняющий порядок элементов в котором они были добавлены, у Map нет порядка, он это оптимизирует под капотом, т.к. обращение к элементам идёт всё ровно через ключи, для статей мы будетм использовать простой Map, т.к. без разницы в каком порядке так идут ключи (id, title, text, ...), а для общей структуры Articles, мы будем использовать OrderedMap, т.к. сдесь нам важно в каком порядке статьи были добавлены/удалены

export const arrToMap = (arr, DataRecord = Map) =>
  arr.reduce((acc, item) => acc.set(item.id, new DataRecord(item)), new OrderedMap({}));

export const mapToArr = (obj) => {
  return obj.valueSeq().toArray();
};
