const fs = require("node:fs/promises");

const joinFirstAndLast = (numArr) => {
  return numArr[0] + numArr[numArr.length - 1];
};

const sumOfCalibrationValues = (calibrationDoc) => {
  const lines = calibrationDoc.split("\n");
  const extractedNumbers = lines.map((line) => {
    const decodedLine = decodeWordNumbers(line);
    return decodedLine.match(/\d/g);
  });

  let sum = 0;

  extractedNumbers.forEach((numArr) => {
    sum += +joinFirstAndLast(numArr);
  });

  return sum;
};

const decodeWordNumbers = (string) => {
  function replacer(match) {
    const numberKey = {
      one: "on1e",
      eno: "on1e",
      two: "tw2o",
      owt: "tw2o",
      three: "thr3ee",
      eerht: "thr3ee",
      four: "fo4ur",
      ruof: "fo4ur",
      five: "fi5ve",
      evif: "fi5ve",
      six: "si6x",
      xis: "si6x",
      seven: "sev7en",
      neves: "sev7en",
      eight: "eig8ht",
      thgie: "eig8ht",
      nine: "ni9ne",
      enin: "ni9ne",
    };
    return numberKey[match];
  }

  const regex =
    /(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)/;

  const newString = string.replace(regex, replacer);

  const regexRev = /eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/;
  const stringRev = newString.split("").reverse().join("");

  const newStringRev = stringRev.replace(regexRev, replacer);

  return newStringRev.split("").reverse().join("");
};

module.exports = {
  joinFirstAndLast,
  sumOfCalibrationValues,
  decodeWordNumbers,
};

function answer() {
  fs.readFile("./puzzleInput.txt", "utf-8")
    .then((response) => {
      return sumOfCalibrationValues(response);
    })
    .then((answer) => {
      console.log(answer);
    })
    .catch((err) => {
      return err;
    });
}

answer();
