const fs = require("fs/promises");

const convertTxtToJSON = (txt) => {
  const lines = txt.split("\n");

  return lines.map((line) => {
    const colonIndex = line.search(":");
    const barIndex = line.search(/\|/g);

    const winningNumArr = line.slice(colonIndex + 2, barIndex - 1).split(" ");
    const cardNumArr = line.slice(barIndex + 2).split(" ");

    return [winningNumArr, cardNumArr];
  });
};

const convertTxtToJSONFile = (fileName) => {
  return fs
    .readFile(`${__dirname}/${fileName}.txt`, "utf-8")
    .then((contentsTxt) => {
      return JSON.stringify(convertTxtToJSON(contentsTxt));
    })
    .then((contentsJSON) => {
      return fs.writeFile(
        `${__dirname}/${fileName}.json`,
        contentsJSON,
        "utf-8"
      );
    });
};

module.exports = { convertTxtToJSON, convertTxtToJSONFile };
