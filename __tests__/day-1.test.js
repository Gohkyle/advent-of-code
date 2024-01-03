const {
  sumOfCalibrationValues,
  joinFirstAndLast,
  decodeWordNumbers,
} = require("../day-1/calibration-document");

describe("joinFirstAndLast", () => {
  test("takes an array, returns a string", () => {
    expect(typeof joinFirstAndLast(["1", "5"])).toBe("string");
  });
  test("takes an array, returns the sum of the first and last number in the array", () => {
    expect(joinFirstAndLast(["1", "5"])).toBe("15");
  });
});
describe("sumOfCalibrationValues", () => {
  test("takes a single line string a returns the sum of the first and last number", () => {
    const calibrationDoc = `1abc2`;

    expect(sumOfCalibrationValues(calibrationDoc)).toBe(12);
  });
  test("takes a multi line string and returns the sum of the first and last number", () => {
    const calibrationDoc = `1abc2
    pqr3stu8vwx
    a1b2c3d4e5f
    treb7uchet`;
    expect(sumOfCalibrationValues(calibrationDoc)).toBe(142);
  });
});

describe("decodeWordNumbers()", () => {
  test("converts single line string that contains word numbers into numbers", () => {
    const calibrationLine = `two1nine`;

    expect(decodeWordNumbers(calibrationLine)).toBe("219");
  });
  test("converts multiple line string that contains word numbers into numbers", () => {
    const calibrationDoc = `two1nine
    abcone2threexyz`;

    const decodedCalibrationDoc = `219
    abc123xyz`;

    expect(decodeWordNumbers(calibrationDoc)).toBe(decodedCalibrationDoc);
  });
  test("changes words to digits from sequence, not by search term", () => {
    const calibrationDoc = `two1nine
    eightwothree
    abcone2threexyz
    xtwone3four
    4nineeightseven2
    zoneight234
    7pqrstsixteen`;

    const decodedCalibrationDoc = `219
    8wo3
    abc123xyz
    x2ne34
    49872
    z1ight234
    7pqrst6teen`;
    expect(decodeWordNumbers(calibrationDoc)).toBe(decodedCalibrationDoc);
  });
});
