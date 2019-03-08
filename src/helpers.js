export const arrToMap = (arr) => {
  return arr.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
};

export const mapToArr = (obj) => {
  return Object.keys(obj).map((id) => obj[id]);
};

// export const mapToArr = (obj) => {
//   const arr = [];
//   for (const key in obj) {
//     arr.push(obj[key]);
//   }
//   return arr;
// };
