const { Map } = require("immutable");

// export const arrToMap = (arr) => {
//   return arr.reduce((acc, item) => {
//     acc.set(item.id, item);
//     return acc;
//   }, new Map({}));
// };

// в одну строку es6
export const arrToMap = (arr) => arr.reduce((acc, item) => acc.set(item.id, item), new Map({}));

export const mapToArr = (obj) => {
  return obj.valueSeq().toArray();
};
