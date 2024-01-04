const {
  sumOfCalibrationValues,
  joinFirstAndLast,
  decodeWordNumbers,
} = require("../day-1/trebuchet");

describe("joinFirstAndLast", () => {
  test("takes an array, returns a string", () => {
    expect(typeof joinFirstAndLast(["1", "5"])).toBe("string");
  });
  test("takes an array, returns concatentation of first and last number in the array", () => {
    expect(joinFirstAndLast(["1", "5"])).toBe("15");
  });
  test("takes an array of one length, double digit number", () => {
    expect(joinFirstAndLast(["5"])).toBe("55");
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
  test("does not mutate original string", () => {
    const calibrationDoc = `1abc2
      pqr3stu8vwx
      a1b2c3d4e5f
      treb7uchet`;

    const copyCalibrationDoc = `1abc2
      pqr3stu8vwx
      a1b2c3d4e5f
      treb7uchet`;

    sumOfCalibrationValues(calibrationDoc);
    expect(copyCalibrationDoc).toBe(calibrationDoc);
  });
});

describe("decodeWordNumbers()", () => {
  test("converts string that contains word numbers into digit integrated word", () => {
    const calibrationLine = `two1nine`;

    expect(decodeWordNumbers(calibrationLine)).toBe("tw2o1en9in");
  });
  test("changes words to digits from sequence, not by search term", () => {
    const calibrationDoc = `two1nine`;
    const cD2 = `eightwothree`;
    const cD3 = `abcone2threexyz`;
    const cD4 = `xtwone3four`;
    const cD5 = `4nineeightseven2`;
    const cD6 = `zoneight234`;
    const cD7 = `7pqrstsixteen`;

    const decodedCalibrationDoc = `tw2o1en9in`;
    const dCD2 = `eig8htwoee3rht`;
    const dCD3 = `abcon1e2ee3rhtxyz`;
    const dCD4 = `xtw2one3ru4of`;
    const dCD5 = `4ni9neeightne7ves2`;
    const dCD6 = `zon1th8gie234`;
    const dCD7 = `7pqrstsi6xteen`;
    expect(decodeWordNumbers(calibrationDoc)).toBe(decodedCalibrationDoc);
    expect(decodeWordNumbers(cD2)).toBe(dCD2);
    expect(decodeWordNumbers(cD3)).toBe(dCD3);
    expect(decodeWordNumbers(cD4)).toBe(dCD4);
    expect(decodeWordNumbers(cD5)).toBe(dCD5);
    expect(decodeWordNumbers(cD6)).toBe(dCD6);
    expect(decodeWordNumbers(cD7)).toBe(dCD7);
  });
  test("changes the words to digits of the last and first in the line, not in sequence", () => {
    const data = `jjhxddmg5mqxqbgfivextlcpnvtwothreetwonerzk`;
    const decoded = `jjhxddmg5mqxqbgfi5vextlcpnvtwothreetwe1norzk`;

    const data2 = "eightrgzfdksevenftbvkt455oneightnl";
    const decoded2 = "eig8htrgzfdksevenftbvkt455onth8gienl";
    expect(decodeWordNumbers(data)).toBe(decoded);
    expect(decodeWordNumbers(data2)).toBe(decoded2);
  });
  test("detects numbers with overlapping/shared characters", () => {
    const data = "oneightsm";
    const decoded = "on1th8giesm";
    expect(decodeWordNumbers(data)).toBe(decoded);
  });
  test("returns a new string", () => {
    const calibrationDoc = `7pqrstsixteen`;

    expect(decodeWordNumbers(calibrationDoc)).not.toBe(calibrationDoc);
  });
  test("does not mutate original string", () => {
    const calibrationDoc = `7pqrstsixteen`;

    const copyCalibrationDoc = `7pqrstsixteen`;

    decodeWordNumbers(calibrationDoc);
    expect(copyCalibrationDoc).toBe(calibrationDoc);
  });
});
