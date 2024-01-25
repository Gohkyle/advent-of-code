const getData = (txt, dataType) => {
  const regex = new RegExp(`(?<=${dataType}:.*)\\d+`, "g");
  return txt.match(regex).map((number) => +number);
};

const formatData = (time, distance) => {
  return;
};
const getTxtToJSON = (txt) => {};

module.exports = { getData };
