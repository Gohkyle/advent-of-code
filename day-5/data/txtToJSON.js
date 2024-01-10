const fs = require("fs/promises");

const getMapRegex = (mapType) => {
  return `(?<=${mapType} map:\\n(\\d+ \\d+ \\d+\\n)*)(\\d+ \\d+ \\d+)`;
};

const getMap = (txt, mapType) => {
  const map = new RegExp(getMapRegex(mapType), "g");

  return txt.match(map).map((line) => line.split(" "));
};

const getMapTypes = (txt) => {
  const mapTypeRegex = /(?<=\n)[\w-]*(?= map:)/g;
  return txt.match(mapTypeRegex);
};

const formatData = (txt) => {
  const mapTypes = getMapTypes(txt);

  return mapTypes.map((mapType) => {
    return { [mapType]: getMap(txt, mapType) };
  });
};

const getSeeds = (txt) => {
  //   const seedsRegex = /(?<=seeds: (\d+ )*)\d+/g;
  //   return txt.match(seedsRegex);
};

const txtToJSON = (fileName) => {
  fs.readFile(`${__dirname}/${fileName}.txt`, "utf-8")
    .then((txt) => {
      return formatData(txt);
    })
    .then(() => {});
};
module.exports = { getMapRegex, getMap, getMapTypes, formatData, getSeeds };
