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
      one: "1",
      eno: "1",
      two: "2",
      owt: "2",
      three: "3",
      eerht: "3",
      four: "4",
      ruof: "4",
      five: "5",
      evif: "5",
      six: "6",
      xis: "6",
      seven: "7",
      neves: "7",
      eight: "8",
      thgie: "8",
      nine: "9",
      enin: "9",
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

console.log(
  sumOfCalibrationValues(`two1nine
    eightwothree
    abcone2threexyz
    xtwone3four
    4nineeightseven2
    zoneight234
    7pqrstsixteen`)
);
