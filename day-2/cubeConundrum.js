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

const cubesStrToObj = (str) => {
  const redRegex = /\d(?= red)/;
  const greenRegex = /\d(?= green)/;
  const blueRegex = /\d(?= blue)/;

  const red = redRegex.exec(str);
  const green = greenRegex.exec(str);
  const blue = blueRegex.exec(str);

  return {
    red: red === null ? 0 : red[0],
    green: green === null ? 0 : green[0],
    blue: blue === null ? 0 : blue[0],
  };
};

const checkGamePossible = (gameObj) => {
  const redCubes = 12;
  const greenCubes = 13;
  const blueCubes = 14;

  const possible =
    gameObj.gameData.red <= redCubes &&
    gameObj.gameData.green <= greenCubes &&
    gameObj.gameData.blue <= blueCubes;

  return { ...gameObj, possible };
};

const sumPossibleGameNo = () => {};

fs.readFile(`${__dirname}/test-input.txt`, "utf-8")
  .then((gameTxt) => {
    return gameTxt.split("\n");
  })
  .then((gamesArray) => {
    return gamesArray.map((game) => gameStringToGameObj(game));
  })
  .then((arrOfGameObj) => {
    return arrOfGameObj.map((gameObj) => {
      return { ...gameObj, gameData: cubesStrToObj(gameObj.gameData) };
    });
  })
  .then((arrOfGameObj) => {
    return arrOfGameObj.map((gameObj) => {
      return checkGamePossible(gameObj);
    });
  })
  .then((res) => {});

module.exports = {
  gameStringToGameObj,
  cubesStrToObj,
  checkGamePossible,
  sumPossibleGameNo,
};
