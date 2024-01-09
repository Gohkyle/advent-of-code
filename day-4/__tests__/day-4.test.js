const { convertTxtToJSON } = require("../data/convertTxtToJson");

describe("setup", () => {
  describe("convertTxtToJson()", () => {
    test("converts a single line string, to an array of line arrays of winning number array and card number array", () => {
      const txt = `Card 1: 1 2 3 4 5 | 1 2 3 4 5 6`;
      const JSON = [
        [
          ["1", "2", "3", "4", "5"],
          ["1", "2", "3", "4", "5", "6"],
        ],
      ];
      expect(convertTxtToJSON(txt)).toEqual(JSON);
    });
    test("converts a multi line string, an array of line arrays of winning number array and card number array", () => {
      const txt = `Card 1: 1 2 3 4 5 | 1 2 3 4 5 6
      Card 2: 9 8 7 6 5 | 9 8 7 6 5 4`;
      const JSON = [
        [
          ["1", "2", "3", "4", "5"],
          ["1", "2", "3", "4", "5", "6"],
        ],
        [
          ["9", "8", "7", "6", "5"],
          ["9", "8", "7", "6", "5", "4"],
        ],
      ];
      expect(convertTxtToJSON(txt)).toEqual(JSON);
    });
  });
});
describe("part1", () => {
  describe("findMatches()", () => {});
});
describe("part2", () => {});
