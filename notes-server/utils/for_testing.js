const reverse = (string) => {
  return string.split("").reverse().join("");
};

const average = (array) => {
  //Something divided by zero is NaN. Chacking this case
  if (array.length === 0) return 0;
  const reducer = (sum, item) => {
    return sum + item;
  };

  return array.reduce(reducer, 0) / array.length;
};

module.exports = {
  reverse,
  average,
};
