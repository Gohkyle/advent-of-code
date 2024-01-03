const fs = require("node:fs/promises");

const joinFirstAndLast = (numArr) => {
  return numArr[0] + numArr[numArr.length - 1];
};

const sumOfCalibrationValues = (calibrationDoc) => {
  const lines = calibrationDoc.split("\n");
  const extractedNumbers = lines.map((line) => {
    return line.match(/\d/g);
  });

  let sum = 0;

  extractedNumbers.forEach((numArr) => {
    sum += +joinFirstAndLast(numArr);
  });

  return sum;
};

const decodeWordNumbers = (string) => {
  //   const numbers = Object.keys(numberKey);
  //   const digits = Object.values(numberKey);
  //   let newString = string;

  function replacer(match) {
    const numberKey = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
    };
    return numberKey[match];
  }
  const regex =
    /(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)/g;

  const newString = string.replace(regex, replacer);

  //   numbers.forEach((number, index) => {
  //     newString = newString.replaceAll(number, digits[index]);
  //   });

  return newString;
};

module.exports = {
  joinFirstAndLast,
  sumOfCalibrationValues,
  decodeWordNumbers,
};

// fetch("https://adventofcode.com/2023/day/1/input")
//   .then((response) => {
//     return response.text();
//   })
//   .then((body) => {
//     console.log(body);
//   });

fs.readFile("./puzzleInput.txt", "utf-8").then((response) => {
  console.log(sumOfCalibrationValues(response));
});
