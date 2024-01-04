const fs = require("node:fs/promises");

const gameStringToGameObj = (str) => {
  const splitGameStr = str.split(":");

  const gameNo = splitGameStr[0].split(" ") || undefined;
  const gameData = splitGameStr[1].split(";") || undefined;

  return {
    game: gameNo[1],
    gameData,
  };
};

fs.readFile(`${__dirname}/test-input.txt`, "utf-8")
  .then((gameTxt) => {
    return gameTxt.split("\n");
  })
  .then((gamesArray) => {
    return gamesArray.map((game) => gameStringToGameObj(game));
  })
  .then((res) => {});

module.exports = { gameStringToGameObj };
