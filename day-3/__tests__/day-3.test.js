const data = require("../data/test-input.json");

const { findParts } = require("../part1");

describe("gearRatios", () => {
  describe("findParts()", () => {
    test("searches string for a number, returns results array", () => {
      const testData = ["467......."];
      const results = [[["467"]]];
      expect(findParts(testData)[0][0][0]).toBe(results[0][0][0]);
      expect(JSON.stringify(findParts(testData))).toBe(JSON.stringify(results));
    });
    test("able to search for multiple numbers in a string", () => {
      const testData = ["467..114.."];
      const results = [[["467"], ["114"]]];
      expect(findParts(testData)[0][0][0]).toBe("467");
      expect(findParts(testData)[0][1][0]).toBe("114");
      expect(JSON.stringify(findParts(testData))).toEqual(
        JSON.stringify(results)
      );
    });
    test("returns an empty array for no results", () => {
      const testData = ["...*......"];
      const results = [[]];
      expect(findParts(testData)).toEqual(results);
    });
    test("able to search multiple string in an array", () => {
      const testData = ["467..114..", "...*......", "..35..633."];
      const results = [[["467"], ["114"]], [], [["35"], ["633"]]];
      expect(JSON.stringify(findParts(testData))).toEqual(
        JSON.stringify(results)
      );
    });
    test("the results array have properties like index", () => {
      const testData = ["467..114..", "...*......", "..35..633."];
      const testResults = [[["467"], ["114"]], [], [["35"], ["633"]]];

      findParts(testData).forEach((row) => {
        row.forEach((result) => {
          console.log(result);
          if (result) {
            expect(result).toHaveProperty("index");
            expect(result).toHaveProperty("input");
          }
        });
      });
      expect(JSON.stringify(findParts(testData))).toEqual(
        JSON.stringify(testResults)
      );
    });
    test("only searches for digits with symbols next to it", () => {
      const testData = ["467..114*.", "...*......", ".+35..633."];
      const testResults = [[["467"]], [], [["633"]]];

      expect(JSON.stringify(findParts(testData))).toBe(
        JSON.stringify(testResults)
      );
    });
  });
});
