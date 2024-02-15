const { getSequences } = require("../data/formatData");
const {
  findStepDiff,
  findNextTerm,
  partOneAnswer,
  laGrangeInterpolation,
} = require("../part1");
const { txtToJSON } = require("../../utils/utils");
const { partTwoAnswer } = require("../part2");

beforeAll(() => {
  return txtToJSON(`${__dirname}/../data/test-input`, getSequences);
});

describe("formatData", () => {
  describe("getSequences()", () => {
    test("takes a string returns an array of the lines, with the numbers stored in an array", () => {
      const txt = `1 2 3 4 5`;
      const sequences = [[1, 2, 3, 4, 5]];
      expect(getSequences(txt)).toEqual(sequences);
    });
    test("takes a multi line string", () => {
      const sequences = [
        [1, 2, 3, 4, 5],
        [7, 8, 9, 10],
      ];
      const txt = `1 2 3 4 5
      7 8 9 10`;
      expect(getSequences(txt)).toEqual(sequences);
    });
    test("finds negative numbers", () => {
      const txt = `-1 -2 -3 -4 -5`;
      const sequences = [[-1, -2, -3, -4, -5]];
      expect(getSequences(txt)).toEqual(sequences);
    });
  });
});
describe("part1", () => {
  describe("findStepDiff()", () => {
    describe("takes an array of numbers, returns an array of the differences between the terms", () => {
      test("primary sequence", () => {
        const sequence = [0, 3, 6, 9];
        const steps = [3, 3, 3];
        expect(findStepDiff(sequence)).toEqual(steps);
      });
      test("secondary sequence", () => {
        const sequence = [1, 3, 6, 10, 15, 21];
        const steps = [2, 3, 4, 5, 6];
        expect(findStepDiff(sequence)).toEqual(steps);
      });
      test("stationary sequence", () => {
        const sequence = [3, 3, 3, 3];
        const steps = [0, 0, 0];
        expect(findStepDiff(sequence)).toEqual(steps);
      });
    });
  });
  describe("findNextTerm()", () => {
    test("find next terms on a primary sequence ", () => {
      const sequence = [0, 3, 6, 9];

      expect(findNextTerm(sequence)).toEqual(12);
    });
    test("find next terms on a secondary sequence ", () => {
      const sequence = [1, 3, 6, 10, 15, 21];

      expect(findNextTerm(sequence)).toEqual(28);
    });
    test("find next terms on a tertiary sequence ", () => {
      const sequence = [10, 13, 16, 21, 30, 45];

      expect(findNextTerm(sequence)).toEqual(68);
    });
  });
  describe("partOneAnswer()", () => {
    test("data assertion", () => {
      const testData = require("../data/test-input.json");
      expect(partOneAnswer(testData)).toBe(114);
    });
  });
  describe("laGrangeInterpolation()", () => {
    test("test first order", () => {
      const sequence = [0, 3, 6, 9, 12];

      expect(laGrangeInterpolation(sequence)).toBe(15);
    });
    test("test second order", () => {
      const sequence = [1, 3, 6, 10, 15, 21];

      expect(laGrangeInterpolation(sequence)).toBe(28);
    });
    test("test third order", () => {
      const sequence = [10, 13, 16, 21, 30, 45];

      expect(laGrangeInterpolation(sequence)).toBe(68);
    });
    describe("takes an optional parameter where, the search term can be specified", () => {
      test("test first order", () => {
        const sequence = [0, 3, 6, 9, 12];

        expect(laGrangeInterpolation(sequence, -1)).toBe(-3);
      });
      test("test second order", () => {
        const sequence = [1, 3, 6, 10, 15, 21];

        expect(laGrangeInterpolation(sequence, -1)).toBe(0);
      });
      test("test third order", () => {
        const sequence = [10, 13, 16, 21, 30, 45];

        expect(laGrangeInterpolation(sequence, -1)).toBe(5);
      });
    });
  });
});
describe("part2", () => {
  test("data assertion", () => {
    const testData = require("../data/test-input.json");
    expect(partTwoAnswer(testData)).toBe(2);
  });
});
