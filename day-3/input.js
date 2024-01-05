const fs = require("node:fs/promises");

function convertTxtToJSON(fileName) {
  return fs
    .readFile(`${__dirname}/data/${fileName}.txt`, "utf-8")
    .then((response) => response.split("\n"))
    .then((response) => {
      fs.writeFile(
        `${__dirname}/data/${fileName}.json`,
        JSON.stringify(response),
        "utf-8"
      );
    });
}

convertTxtToJSON("input");
