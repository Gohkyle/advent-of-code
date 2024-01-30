const fs = require("fs/promises");

const txtToJSON = (pathFile, formatFn) => {
  return fs
    .readFile(`${pathFile}.txt`, "utf-8")
    .then((txt) => {
      return formatFn(txt);
    })
    .then((data) => {
      return fs.writeFile(`${pathFile}.json`, JSON.stringify(data), "utf-8");
    });
};

module.exports = { txtToJSON };
