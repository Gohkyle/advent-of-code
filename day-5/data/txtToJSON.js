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
  const mapObj = {};

  mapTypes.forEach((mapType) => {
    Object.assign(mapObj, { [mapType]: getMap(txt, mapType) });
  });
  return mapObj;
};

const getSeeds = (txt) => {
  const seedsRegex = /(?<=seeds: (\d+ )*)\d+/g;
  return txt.match(seedsRegex);
};

const txtToJSON = (filePath) => {
  return fs
    .readFile(`${filePath}.txt`, "utf-8")
    .then((txt) => {
      const seeds = getSeeds(txt);
      const maps = formatData(txt);

      return { ...maps, seeds };
    })
    .then((data) => {
      return fs.writeFile(`${filePath}.json`, JSON.stringify(data), "utf-8");
    });
};

txtToJSON(`${__dirname}/test-input`);
module.exports = {
  getMapRegex,
  getMap,
  getMapTypes,
  formatData,
  getSeeds,
  txtToJSON,
};
