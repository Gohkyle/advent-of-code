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
  updateGearObj,
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
  describe("part2", () => {
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
      describe("takes the data returns a new array of gear parts objects with an ID and parts array", () => {
        describe("by checking next row for adjacent *", () => {
          test("one * directly below", () => {
            const testData = [".1.", ".*."];
            const testResults = [{ id: "1,1", parts: ["1"] }];

            console.log(findGearParts(testData));
            expect(findGearParts(testData)).toEqual(testResults);
          });
          test("digits diagonally below", () => {
            const testData = [".1.", "*.."];
            const testData1 = [".1.", "..*"];
            const testResult = [{ id: "1,0", parts: ["1"] }];
            const testResult1 = [{ id: "1,2", parts: ["1"] }];

            expect(findGearParts(testData1)).toEqual(testResult1);
          });
          test("diagonal search works at the beginning of string", () => {
            const testData = ["1..", "*.."];
            const testResult = [{ id: "1,0", parts: ["1"] }];

            expect(findGearParts(testData)).toEqual(testResult);
          });
          test("diagonal search works at the end of string", () => {
            const testData = ["..1", "..*"];
            const testResult = [{ id: "1,2", parts: ["1"] }];

            expect(findGearParts(testData)).toEqual(testResult);
          });
          test("works for multidigit numbers", () => {
            const testData = [".21", "..*"];
            const testResult = [{ id: "1,2", parts: ["21"] }];

            const testData1 = [".21..", "..*.."];
            const testResult1 = [{ id: "1,2", parts: ["21"] }];

            expect(findGearParts(testData)).toEqual(testResult);
            expect(findGearParts(testData1)).toEqual(testResult1);
          });
          test("doesn't break on the last row", () => {
            const testData = [".....", ".21.."];
            const testResult = [];

            expect(findGearParts(testData)).toEqual(testResult);
          });
          test("only returns for star symbols", () => {
            const testData = [".1.", "#.."];
            const testResult = [];
            const testData1 = [".#.", ".1."];
            const testResult1 = [];
            const testData2 = ["..#", ".1."];
            const testResult2 = [];

            expect(findGearParts(testData)).toEqual(testResult);
            expect(findGearParts(testData1)).toEqual(testResult1);
            expect(findGearParts(testData2)).toEqual(testResult2);
          });
        });
        describe("by checking previous row for adjacent symbols", () => {
          test("one digit directly above", () => {
            const testData = [".*.", ".1."];
            const testResult = [{ id: "0,1", parts: ["1"] }];

            expect(findGearParts(testData)).toEqual(testResult);
          });
          test("digits diagonally above", () => {
            const testData = ["*..", ".1."];
            const testData1 = ["..*", ".1."];

            const testResult = [{ id: "0,0", parts: ["1"] }];
            const testResult1 = [{ id: "0,2", parts: ["1"] }];

            expect(findGearParts(testData)).toEqual(testResult);
            expect(findGearParts(testData1)).toEqual(testResult1);
          });
          test("diagonal search doesn't break for the beginning of string", () => {
            const testData = ["*..", "1.."];
            const testResult = [{ id: "0,0", parts: ["1"] }];

            expect(findGearParts(testData)).toEqual(testResult);
          });
          test("diagonal search doesn't break at the end of string", () => {
            const testData = ["..*", "..1"];
            const testResult = [{ id: "0,2", parts: ["1"] }];

            expect(findGearParts(testData)).toEqual(testResult);
          });
          test("works for multidigit numbers", () => {
            const testData = ["..*", ".32"];
            const testResult = [{ id: "0,2", parts: ["32"] }];
            expect(findGearParts(testData)).toEqual(testResult);
          });
          test("doesn't break on the first row", () => {
            const testData = [".21..", "..*.."];
            const testResult = [{ id: "1,2", parts: ["21"] }];
            expect(findGearParts(testData)).toEqual(testResult);
          });
          test("only detects *", () => {
            const testData = ["..#..", ".22.."];
            const testResult = [];
            expect(findGearParts(testData)).toEqual(testResult);
          });
        });
        describe("checking inline", () => {
          test("returns the result array, if detects a * after the number", () => {
            const testData = ["..12*."];
            const testResult = [{ id: "0,4", parts: ["12"] }];
            expect(findGearParts(testData)).toEqual(testResult);
          });
          test("returns the result array, if detects a * before the number", () => {
            const testData = [".*12.."];
            const testResult = [{ id: "0,1", parts: ["12"] }];
            expect(findGearParts(testData)).toEqual(testResult);
          });
        });
        test("if gearObj id already exists, the parts is added to the array", () => {
          const testData = ["467..114..", "...*......", "..35..633."];
          const testResult = [{ id: "1,3", parts: ["467", "35"] }];
          expect(findGearParts(testData)).toEqual(testResult);
        });
      });
      describe("helper functions", () => {
        describe("updateGearObj()", () => {
          test("takes an array and new entry, updates array with new entry", () => {
            const arr = [];
            const newEntry = { id: "0,0", partNumber: "1" };
            const result = [{ id: "0,0", parts: ["1"] }];

            expect(updateGearObj(arr, newEntry)).toEqual(result);
          });
          test("takes a non empty array and new entry, updates array with new entry", () => {
            const arr = [{ id: "1,0", parts: ["1"] }];
            const newEntry = { id: "0,0", partNumber: "1" };
            const result = [
              { id: "1,0", parts: ["1"] },
              { id: "0,0", parts: ["1"] },
            ];
            expect(updateGearObj(arr, newEntry)).toEqual(result);
          });
          test("updates object parts if id already exists with new entry partNumber", () => {
            const arr = [{ id: "1,0", parts: ["1"] }];
            const newEntry = { id: "1,0", partNumber: "2" };
            const result = [{ id: "1,0", parts: ["1", "2"] }];

            expect(updateGearObj(arr, newEntry)).toEqual(result);
          });

          test("returns a new array ", () => {
            const arr = [{ id: "1,0", parts: ["1"] }];
            const newEntry = { id: "1,0", partNumber: "2" };

            expect(updateGearObj(arr, newEntry)).not.toEqual(arr);
          });
          test("does not mutate original array ", () => {
            const arr = [{ id: "1,0", parts: ["1"] }];
            const copyArr = [{ id: "1,0", parts: ["1"] }];
            const newEntry = { id: "1,0", partNumber: "2" };

            updateGearObj(arr, newEntry);
            expect(arr).toEqual(copyArr);
          });
        });
      });
    });
  });
});
