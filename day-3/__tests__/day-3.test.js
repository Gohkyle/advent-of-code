const data = require("../data/test-input.json");
const testRegexData = require("../data/test-regex-input.json");

const {
  findNonParts,
  checkNonParts,
  getTotal,
  getNonPartsTotal,
} = require("../part1");

const {
  findStars,
  findNumbers,
  findGearParts,
  createGearProfiles,
} = require("../part2");

describe("gearRatios", () => {
  describe("part1", () => {
    describe("findNonParts()", () => {
      test("searches string for a number, returns results array", () => {
        const testData = ["467......."];
        const results = [[["467"]]];
        expect(findNonParts(testData)[0][0][0]).toBe(results[0][0][0]);
        expect(JSON.stringify(findNonParts(testData))).toBe(
          JSON.stringify(results)
        );
      });
      test("able to search for multiple numbers in a string", () => {
        const testData = ["467..114.."];
        const results = [[["467"], ["114"]]];
        expect(findNonParts(testData)[0][0][0]).toBe("467");
        expect(findNonParts(testData)[0][1][0]).toBe("114");
        expect(JSON.stringify(findNonParts(testData))).toEqual(
          JSON.stringify(results)
        );
      });
      test("returns an empty array for no results", () => {
        const testData = ["...*......"];
        const results = [[]];
        expect(findNonParts(testData)).toEqual(results);
      });
      test("able to search multiple string in an array", () => {
        const testData = ["467..114..", "...*......", "..35..633."];
        const results = [[["467"], ["114"]], [], [["35"], ["633"]]];
        expect(JSON.stringify(findNonParts(testData))).toEqual(
          JSON.stringify(results)
        );
      });
      test("the results array have properties like index", () => {
        const testData = ["467..114..", "...*......", "..35..633."];
        const testResults = [[["467"], ["114"]], [], [["35"], ["633"]]];

        findNonParts(testData).forEach((row) => {
          row.forEach((result) => {
            console.log(result);
            if (result) {
              expect(result).toHaveProperty("index");
              expect(result).toHaveProperty("input");
            }
          });
        });
        expect(JSON.stringify(findNonParts(testData))).toEqual(
          JSON.stringify(testResults)
        );
      });
      test("only searches for digits without symbols next to it", () => {
        const testData = ["467..114*.", "...*......", ".+35..633."];
        const testResults = [[["467"]], [], [["633"]]];

        const testRegexResults = [
          [["114"]],
          [],
          [["35"], ["633"]],
          [],
          [["11"]],
          [["58"]],
          [["592"]],
          [["755"]],
          [],
          [["664"], ["598"], ["1"]],
        ];
        expect(JSON.stringify(findNonParts(testData))).toBe(
          JSON.stringify(testResults)
        );
        expect(JSON.stringify(findNonParts(testRegexData))).toBe(
          JSON.stringify(testRegexResults)
        );
      });
    });
    describe("checkNonParts()", () => {
      describe("returns a new array of filtered results", () => {
        describe("by checking next row for adjacent symbols", () => {
          test("one digit directly below", () => {
            const testData = [".1.", ".*."];
            const testResults = [[], []];

            expect(checkNonParts(testData)).toEqual(testResults);
          });
          test("digits diagonally below", () => {
            const testData = [".1.", "*.."];
            const testData1 = [".1.", "..*"];
            const testResults = [[], []];

            expect(checkNonParts(testData)).toEqual(testResults);
            expect(checkNonParts(testData1)).toEqual(testResults);
          });
          test("diagonal search works at the beginning of string", () => {
            const testData = ["1..", "*.."];
            const testResults = [[], []];

            expect(checkNonParts(testData)).toEqual(testResults);
          });
          test("diagonal search works at the end of string", () => {
            const testData = ["..1", "..*"];
            const testResults = [[], []];

            expect(checkNonParts(testData)).toEqual(testResults);
          });
          test("works for multidigit numbers", () => {
            const testData = [".21", "..*"];
            const testResults = [[], []];

            const testData1 = [".21..", "..*.."];
            const testResults1 = [[], []];

            expect(checkNonParts(testData)).toEqual(testResults);
            expect(checkNonParts(testData1)).toEqual(testResults1);
          });
          test("doesn't break on the last row", () => {
            const testData1 = [".....", ".21.."];
            const testResults1 = [[], [["21"]]];

            expect(JSON.stringify(checkNonParts(testData1))).toEqual(
              JSON.stringify(testResults1)
            );
          });
        });
        describe("by checking previous row for adjacent symbols", () => {
          test("one digit directly above", () => {
            const testData = [".*.", ".1."];
            const testResults = [[], []];

            expect(checkNonParts(testData)).toEqual(testResults);
          });
          test("digits diagonally above", () => {
            const testData = ["*..", ".1."];
            const testData1 = ["..*", ".1."];
            const testResults = [[], []];

            expect(checkNonParts(testData)).toEqual(testResults);
            expect(checkNonParts(testData1)).toEqual(testResults);
          });
          test("diagonal search doesn't break for the beginning of string", () => {
            const testData = ["*..", "1.."];
            const testResults = [[], []];

            expect(checkNonParts(testData)).toEqual(testResults);
          });
          test("diagonal search doesn't break at the end of string", () => {
            const testData = ["..*", "..1"];
            const testResults = [[], []];

            expect(checkNonParts(testData)).toEqual(testResults);
          });
          test("works for multidigit numbers", () => {
            const testData = ["..*", ".32"];
            const testResults = [[], []];

            const testData1 = ["..*..", ".22.."];
            const testResults1 = [[], []];

            expect(checkNonParts(testData)).toEqual(testResults);
            expect(checkNonParts(testData1)).toEqual(testResults1);
          });
          test("doesn't break on the first row", () => {
            const testData = [".21.."];
            const testResults = [[["21"]]];
            expect(JSON.stringify(checkNonParts(testData))).toEqual(
              JSON.stringify(testResults)
            );
          });
        });
        test("testData assertion", () => {
          const results = [[["114"]], [], [], [], [], [["58"]], [], [], [], []];
          expect(JSON.stringify(checkNonParts(data))).toBe(
            JSON.stringify(results)
          );
        });
      });
    });
    describe("getTotal()", () => {
      test("returns a total of all the numbers in the string", () => {
        expect(getTotal(data)).toBe(4533);
      });
    });
    describe("getNonPartsTotal()", () => {
      test("returns the total of non part numbers", () => {
        expect(getNonPartsTotal(data)).toBe(172);
      });
    });
  });
  describe.only("part2", () => {
    describe("findStars()", () => {
      test("returns results array for any stars", () => {
        const results = [[], [["*"]], [], [], [["*"]], [], [], [], [["*"]], []];
        expect(JSON.stringify(findStars(data))).toEqual(
          JSON.stringify(results)
        );
      });
    });
    describe("findParts()", () => {
      test("returns results array for any numbers", () => {
        const results = [
          [["467"], ["114"]],
          [],
          [["35"], ["633"]],
          [],
          [["617"]],
          [["58"]],
          [["592"]],
          [["755"]],
          [],
          [["664"], ["598"]],
        ];
        expect(JSON.stringify(findNumbers(data))).toEqual(
          JSON.stringify(results)
        );
      });
    });
    describe("findGearParts()", () => {
      describe("takes the data returns a new array of gear parts objects with an ID and partNo array", () => {
        describe("by checking next row for adjacent *", () => {
          test("one * directly below", () => {
            const testData = [".1.", ".*."];
            const testResults = expect(
              JSON.stringify(findGearParts(testData))
            ).toEqual(JSON.stringify(testResults));
          });
          test("digits diagonally below", () => {
            const testData = [".1.", "*.."];
            const testData1 = [".1.", "..*"];
            const testResults = [[["1"]], []];

            expect(JSON.stringify(findGearParts(testData))).toEqual(
              JSON.stringify(testResults)
            );
            expect(JSON.stringify(findGearParts(testData1))).toEqual(
              JSON.stringify(testResults)
            );
          });
          test("diagonal search works at the beginning of string", () => {
            const testData = ["1..", "*.."];
            const testResults = [[["1"]], []];

            expect(JSON.stringify(findGearParts(testData))).toEqual(
              JSON.stringify(testResults)
            );
          });
          test("diagonal search works at the end of string", () => {
            const testData = ["..1", "..*"];
            const testResults = [[["1"]], []];

            expect(JSON.stringify(findGearParts(testData))).toEqual(
              JSON.stringify(testResults)
            );
          });
          test("works for multidigit numbers", () => {
            const testData = [".21", "..*"];
            const testResults = [[["21"]], []];

            const testData1 = [".21..", "..*.."];
            const testResults1 = [[["21"]], []];

            expect(JSON.stringify(findGearParts(testData))).toEqual(
              JSON.stringify(testResults)
            );
            expect(JSON.stringify(findGearParts(testData1))).toEqual(
              JSON.stringify(testResults1)
            );
          });
          test("doesn't break on the last row", () => {
            const testData1 = [".....", ".21.."];
            const testResults1 = [[], []];

            expect(JSON.stringify(findGearParts(testData1))).toEqual(
              JSON.stringify(testResults1)
            );
          });
          test("only returns for star symbols", () => {
            const testData = [".1.", "#.."];
            const testResult = [[], []];
            const testData1 = [".#.", ".1."];
            const testResult1 = [[], []];
            const testData2 = ["..#", ".1."];
            const testResult2 = [[], []];

            expect(JSON.stringify(findGearParts(testData1))).toEqual(
              JSON.stringify(testResult1)
            );
            expect(findGearParts(testData)).toEqual(testResult);
            expect(findGearParts(testData1)).toEqual(testResult1);
            expect(findGearParts(testData2)).toEqual(testResult2);
          });
        });
        describe("by checking previous row for adjacent symbols", () => {
          test("one digit directly above", () => {
            const testData = [".*.", ".1."];
            const testResults = [[], [["1"]]];

            expect(JSON.stringify(findGearParts(testData))).toEqual(
              JSON.stringify(testResults)
            );
          });
          test("digits diagonally above", () => {
            const testData = ["*..", ".1."];
            const testData1 = ["..*", ".1."];
            const testResults = [[], [["1"]]];

            expect(JSON.stringify(findGearParts(testData))).toEqual(
              JSON.stringify(testResults)
            );
            expect(JSON.stringify(findGearParts(testData1))).toEqual(
              JSON.stringify(testResults)
            );
          });
          test("diagonal search doesn't break for the beginning of string", () => {
            const testData = ["*..", "1.."];
            const testResults = [[], [["1"]]];

            expect(JSON.stringify(findGearParts(testData))).toEqual(
              JSON.stringify(testResults)
            );
          });
          test("diagonal search doesn't break at the end of string", () => {
            const testData = ["..*", "..1"];
            const testResults = [[], [["1"]]];

            expect(JSON.stringify(findGearParts(testData))).toEqual(
              JSON.stringify(testResults)
            );
          });
          test("works for multidigit numbers", () => {
            const testData = ["..*", ".32"];
            const testResults = [[], [["32"]]];

            const testData1 = ["..*..", ".22.."];
            const testResults1 = [[], [["22"]]];

            expect(JSON.stringify(findGearParts(testData))).toEqual(
              JSON.stringify(testResults)
            );
            expect(JSON.stringify(findGearParts(testData1))).toEqual(
              JSON.stringify(testResults1)
            );
          });
          test("doesn't break on the first row", () => {
            const testData = [".21..", "..*.."];
            const testResults = [[["21"]], []];
            expect(JSON.stringify(findGearParts(testData))).toEqual(
              JSON.stringify(testResults)
            );
          });
          test("only detects *", () => {
            const testData = ["..#..", ".22.."];
            const testResult = [[], []];
            expect(findGearParts(testData)).toEqual(testResult);
          });
        });
        describe("checking inline", () => {
          test("returns the result array, if detects a * after the number", () => {
            const data = ["..12*."];
            const result = [[["12"]]];

            expect(JSON.stringify(findGearParts(data))).toBe(
              JSON.stringify(result)
            );
          });
          test("returns the result array, if detects a * before the number", () => {
            const data = [".*12.."];
            const result = [[["12"]]];

            expect(JSON.stringify(findGearParts(data))).toBe(
              JSON.stringify(result)
            );
          });
        });
      });
    });
    describe("createGearProfiles()", () => {
      test("takes findGearParts, but returns an array of gear objects, ID by their coordinates", () => {
        const result = [
          { id: "1,3", partNo: ["467", "35"] },
          { id: "8,4", partNo: ["755", "598"] },
        ];

        expect(createGearProfiles(data)).toEqual(result);
      });
    });
  });
});
