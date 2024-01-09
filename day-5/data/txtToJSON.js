const fs = require("fs/promises");

const getMapRegex = (mapType) => {
  return `(?<=${mapType} map:\\n(\\d+ \\d+ \\d+\\n)*)(\\d+ \\d+ \\d+)`;
};

const getMap = (txt, mapType) => {
  const map = new RegExp(getMapRegex(mapType), "g");

  return txt.match(map).map((line) => line.split(" "));
};
const getMapTypeRegex = () => {
  //extracts names from pre map:
};

const txtToJSON = (fileName) => {
  fs.readFile(`${__dirname}/${fileName}.txt`, "utf-8").then(() => {
    const mapTypes = [
      "seed-to-soil",
      "soil-to-fertilizer",
      "fertilizer-to-water",
      "water-to-light",
      "light-to-temp",
      "temp-to-humidity",
    ];
  });
};
module.exports = { getMapRegex, getMap };
