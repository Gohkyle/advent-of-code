const { getData } = require("../data/txtToJSON");

const mock = require("mock-fs");

describe("txtToJSON", () => {
  describe("getData()", () => {
    test("takes Time as a string, and returns all the numbers following the string", () => {
      const timeString = "Time: 1 2 3";
      const timeData = [1, 2, 3];

      expect(getData(timeString, "Time")).toEqual(timeData);
    });
    test("takes Date as a string, and returns all the numbers following the string", () => {
      const dataString = "Time: 1 2 3 Distance: 9 8 7";
      const timeData = [9, 8, 7];

      expect(getData(dataString, "Distance")).toEqual(timeData);
    });
    test("returns array of numbers", () => {
      const timeString = "Time: 2 3";

      getData(timeString, "Time").forEach((data) => {
        expect(typeof data).toBe("number");
      });
    });
    test("original string is not mutated", () => {
      const dataString = "Time: 1 2 3 Distance: 9 8 7";
      const copyDataString = "Time: 1 2 3 Distance: 9 8 7";
      getData(dataString, "Time");

      expect(dataString).toBe(copyDataString);
    });
  });
  describe("formatData()", () => {
    test("takes two arrays, returns an array of objects with the values on time and distance properties", () => {
      const timeArr = [1, 2, 3];
      const distanceArr = [9, 8, 7];
      const resultArr = [
        { time: 1, distance: 9 },
        { time: 2, distance: 8 },
        { time: 3, distance: 7 },
      ];

      expect(formatData(timeArr, distanceArr)).toEqual(resultArr);
    });
  });
  describe("getTxtToJson()", () => {
    beforeAll(() => {
      mock({
        folderName: {
          "test-input.txt": `Time:   1 2 3\\nDistance: 1 2 3`,
        },
      });
    });

    afterAll(() => {
      mock.restore();
    });

    test("new file is created with suffix.JSON", () => {});
    test("returns an array of objects with properties Time and Distance", () => {});
  });
});
