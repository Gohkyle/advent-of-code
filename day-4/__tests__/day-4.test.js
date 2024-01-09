const {
  convertTxtToJSON,
  removeBlanks,
  convertTxtToJSONFile,
} = require("../data/convertTxtToJson");
const { findMatches, calcPoints, sumPoints, part1Answer } = require("../part1");
const { scratchCardTracker } = require("../part2");

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
    test("double spaces, do not produce blank entries", () => {
      const txt = `Card 1: 1  2 3 4 5 | 1 2 3 41 5 6
      Card 2: 91 8 7 6 5 | 9 8 7 6  5 4`;
      const JSON = [
        [
          ["1", "2", "3", "4", "5"],
          ["1", "2", "3", "41", "5", "6"],
        ],
        [
          ["91", "8", "7", "6", "5"],
          ["9", "8", "7", "6", "5", "4"],
        ],
      ];
      expect(convertTxtToJSON(txt)).toEqual(JSON);
    });
  });
  describe("removeBlanks()", () => {
    test("removes blank values in an array", () => {
      const containsBlanks = ["2", ""];
      const noBlanks = ["2"];
      expect(removeBlanks(containsBlanks)).toEqual(noBlanks);
    });
  });
});
describe("part1", () => {
  describe("findMatches()", () => {
    test("returns an array which replaces the winning numbers and card numbers with the matching numbers", () => {
      const scratchCards = [
        [
          ["1", "2", "3", "5"],
          ["1", "2", "3", "4", "5", "6"],
        ],
      ];
      const matchingNumbers = [["1", "2", "3", "5"]];

      const scratchCards1 = [[["1", "2", "3", "5"], ["6"]]];
      const matchingNumbers1 = [[]];

      expect(findMatches(scratchCards)).toEqual(matchingNumbers);
      expect(findMatches(scratchCards1)).toEqual(matchingNumbers1);
    });
  });
  describe("calcPoints()", () => {
    test("takes array of matching number and returns 2 to the power of the length -1", () => {
      const matchingNumbers = [["1", "2", "3", "5"]];

      expect(calcPoints(matchingNumbers)).toEqual([8]);
    });
    test("returns 0 for no matches", () => {
      const matchingNumbers = [[]];

      expect(calcPoints(matchingNumbers)).toEqual([0]);
    });
  });
  describe("sumPoints()", () => {
    test("takes an array of points and returns the sum", () => {
      const points = [1, 2, 3];

      expect(sumPoints(points)).toBe(6);
    });
  });
  test("test data asssertion", () => {
    convertTxtToJSONFile("test-input").then(() => {
      const testInput = require("../data/test-input.json");
      expect(part1Answer(testInput)).toBe(13);
    });
  });
});
describe("part2", () => {
  describe("scratchCardTracker()", () => {
    test("takes 0 matches array, returns tracker array with 1", () => {
      const firstScratchCard = [[]];

      const tracker = [1];

      expect(scratchCardTracker(firstScratchCard)).toEqual(tracker);
    });
    test("tracker array is same length as match scratch", () => {
      const firstScratchCard = [[], [], []];

      const tracker = [1, 1, 1];

      expect(scratchCardTracker(firstScratchCard)).toEqual(tracker);
      expect(scratchCardTracker(firstScratchCard)).toHaveLength(
        firstScratchCard.length
      );
    });
    test("takes 1 matches array, updates tracker array count by 1 for each match", () => {
      const firstScratchCard = [["48", "83", "86"], [], [], []];

      const tracker = [1, 2, 2, 2];

      expect(scratchCardTracker(firstScratchCard)).toEqual(tracker);
    });
    test("tracker updates do not exceed the original scratch cards numbers", () => {
      const matches = [["48", "83", "86", "17"], [], [], []];

      const tracker = [1, 2, 2, 2];

      expect(scratchCardTracker(matches)).toEqual(tracker);
      expect(scratchCardTracker(matches)).toHaveLength(matches.length);
    });
    test("the number of duplicate scratch card is factored", () => {
      const matches = [["48", "83", "86", "17"], ["32", "61"], [], []];

      const tracker = [1, 2, 4, 4];

      expect(scratchCardTracker(matches)).toEqual(tracker);
    });
    test("test data assertion", () => {
      convertTxtToJSONFile("test-input")
        .then(() => {
          const testInput = require("../data/test-input.json");
          return findMatches(testInput);
        })
        .then((matches) => {
          expect(scratchCardTracker(matches)).toEqual([1, 2, 4, 8, 14, 1]);
        });
    });
  });
  test("test assertion for total", () => {
    convertTxtToJSONFile("test-input")
      .then(() => {
        const testInput = require("../data/test-input.json");
        return findMatches(testInput);
      })
      .then((matches) => {
        const tracker = scratchCardTracker(matches);
        expect(sumPoints(tracker)).toBe(30);
      });
  });
});
