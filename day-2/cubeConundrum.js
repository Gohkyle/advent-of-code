const fs = require("node:fs/promises");

const gameStrToGameObj = (gamesArr) => {
  return gamesArr.map((gameStr) => {
    const splitGameStr = gameStr.split(":");
    const gameNo = splitGameStr[0].split(" ") || undefined;
    const gameData = splitGameStr[1].split(";") || undefined;

    return {
      game: +gameNo[1],
      gameData,
    };
  });
};

const roundStrToObj = (str) => {
  const redRegex = /\d+(?= red)/;
  const greenRegex = /\d+(?= green)/;
  const blueRegex = /\d+(?= blue)/;

  const red = redRegex.exec(str);
  const green = greenRegex.exec(str);
  const blue = blueRegex.exec(str);

  return {
    red: red === null ? 0 : +red[0],
    green: green === null ? 0 : +green[0],
    blue: blue === null ? 0 : +blue[0],
  };
};

const convertsRoundData = (gameArr) => {
  return gameArr.map((gameObj) => {
    const gameData = gameObj.gameData.map((roundData) => {
      return roundStrToObj(roundData);
    });
    return { ...gameObj, gameData };
  });
};

const checkGamePossible = (gameArr) => {
  return gameArr.map((gameObj) => {
    const redCubes = 12;
    const greenCubes = 13;
    const blueCubes = 14;

    for (let i = 0; i < gameObj.gameData.length; i++) {
      if (
        gameObj.gameData[i].red > redCubes ||
        gameObj.gameData[i].green > greenCubes ||
        gameObj.gameData[i].blue > blueCubes
      ) {
        return { ...gameObj, possible: false };
      }
    }
    return { ...gameObj, possible: true };
  });
};

const sumPossibleGameNo = (gameData) => {
  let sum = 0;
  gameData.forEach((gameDatum) => {
    gameDatum.possible ? (sum += gameDatum.game) : null;
  });
  return sum;
};

const addMinimumPossible = (gameArr) => {
  return gameArr.map((gameObj) => {
    function searchColour(colour) {
      let quantity = 0;
      gameObj.gameData.forEach((round) => {
        if (round[colour] > quantity) {
          quantity = round[colour];
        }
      });
      return quantity;
    }
    const red = searchColour("red");
    const green = searchColour("green");
    const blue = searchColour("blue");

    const gameMin = {
      red,
      green,
      blue,
    };

    return { ...gameObj, gameMin };
  });
};

const addPower = (gameArr) => {
  return gameArr.map((gameObj) => {
    const { gameMin } = gameObj;

    const power = gameMin.red * gameMin.blue * gameMin.green;
    return { ...gameObj, power };
  });
};

const sumPowers = (gameArr) => {
  let sum = 0;
  gameArr.forEach(({ power }) => {
    return (sum += power);
  });
  return sum;
};

const testData = "./test-input.txt";
const data = "./input.txt";

function txtToData(path) {
  return fs
    .readFile(`${__dirname}/${path}`, "utf-8")
    .then((gameTxt) => {
      return gameTxt.split("\n");
    })
    .then((gamesArray) => {
      return gameStrToGameObj(gamesArray);
    })
    .then((gameObjArr) => {
      return convertsRoundData(gameObjArr);
    });
}

function answerPart1(path) {
  return txtToData(path)
    .then((gameArr) => {
      return checkGamePossible(gameArr);
    })
    .then((gameArr) => {
      return sumPossibleGameNo(gameArr);
    })
    .then((answer) => {
      console.log(answer);
    });
}
function answerPart2(path) {
  return txtToData(path)
    .then((gameArr) => {
      return addMinimumPossible(gameArr);
    })
    .then((gameArr) => {
      return addPower(gameArr);
    })
    .then((gameArr) => {
      return sumPowers(gameArr);
    })
    .then((answer) => {
      console.log(answer);
    });
}

module.exports = {
  gameStrToGameObj,
  roundStrToObj,
  convertsRoundData,
  checkGamePossible,
  sumPossibleGameNo,
  addMinimumPossible,
  addPower,
  sumPowers,
};

answerPart2(data);
