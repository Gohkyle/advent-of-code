const fs = require("fs/promises");
const getData = (txt, dataType) => {
  const regex = new RegExp(`(?<=${dataType}:.*)\\d+`, "g");
  return txt.match(regex).map((number) => +number);
};

const formatData = (times, distances) => {
  return times.map((raceTime, index) => {
    const time = raceTime;
    const distance = distances[index];
    return { time, distance };
  });
};

const concatData = (array) => {
  return +array.toString().replaceAll(",", "");
};

const getTxtToJSON = (file) => {
  return fs
    .readFile(`${file}.txt`, "utf-8")
    .then((txt) => {
      const times = getData(txt, "Time");
      const distances = getData(txt, "Distance");
      return formatData(times, distances);
    })
    .then((data) => {
      return fs.writeFile(`${file}.json`, JSON.stringify(data), "utf-8");
    });
};
const getTxtToJSON2 = (file) => {
  return fs
    .readFile(`${file}.txt`, "utf-8")
    .then((txt) => {
      const times = getData(txt, "Time");
      const distances = getData(txt, "Distance");

      const time = concatData(times);
      const distance = concatData(distances);
      return { time, distance };
    })
    .then((data) => {
      return fs.writeFile(`${file}2.json`, JSON.stringify(data), "utf-8");
    });
};

module.exports = {
  getData,
  formatData,
  getTxtToJSON,
  concatData,
  getTxtToJSON2,
};
