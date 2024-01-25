const { getData, formatData, getTxtToJSON } = require("../data/txtToJSON");

const mock = require("mock-fs");
const fs = require("fs");

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
    test("returns a new array", () => {
      const timeArr = [1, 2, 3];
      const distanceArr = [9, 8, 7];

      expect(formatData(timeArr, distanceArr)).not.toEqual(timeArr);
      expect(formatData(timeArr, distanceArr)).not.toEqual(distanceArr);
    });
    test("original arrays are not mutated", () => {
      const timeArr = [1, 2, 3];
      const copyTimeArr = [1, 2, 3];

      const distanceArr = [9, 8, 7];
      const copyDistanceArr = [9, 8, 7];

      formatData(timeArr, distanceArr);

      expect(timeArr).toEqual(copyTimeArr);
      expect(distanceArr).toEqual(copyDistanceArr);
    });
  });
  describe("getTxtToJson()", () => {
    beforeAll(() => {
      mock({
        folderName: {
          "test-input.txt": `Time:   1 2 3
          Distance: 1 2 3`,
        },
      });
    });

    afterAll(() => {
      mock.restore();
    });

    const filePath = `${process.cwd()}/folderName/test-input`;

    test("new file is created with suffix.JSON", () => {
      const expectedFolder = ["test-input.json", "test-input.txt"];

      return getTxtToJSON(filePath).then(() => {
        const folder = fs.readdirSync(`${process.cwd()}/folderName`);
        expect(folder).toEqual(expectedFolder);
      });
    });
    test("file contains the correct structure", () => {
      const expectedJSON = JSON.stringify([
        { time: 1, distance: 1 },
        { time: 2, distance: 2 },
        { time: 3, distance: 3 },
      ]);

      return getTxtToJSON(filePath).then(() => {
        const fileJSON = fs.readFileSync(`${filePath}.json`, "utf-8");
        console.log(fileJSON);
        expect(fileJSON).toEqual(expectedJSON);
      });
    });
  });
});
