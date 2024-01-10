const {
  getMapRegex,
  getMap,
  getMapTypes,
  formatData,
  getSeeds,
  txtToJSON,
} = require("../data/txtToJSON");

const mock = require("mock-fs");

const fs = require("fs");
const { seedToSoil, convert } = require("../part1");

describe("txtToJSON.js", () => {
  describe("getMapRegex()", () => {
    test("takes a string, returns regex expression with embedded string ", () => {
      expect(getMapRegex("seed-to-soil")).toBe(
        "(?<=seed-to-soil map:\\n(\\d+ \\d+ \\d+\\n)*)(\\d+ \\d+ \\d+)"
      );
    });
  });
  describe("getMap", () => {
    test("extracts an array from string for the given map type", () => {
      const testInputTxt = `seed: 79 14 55 13\n\nseed-to-soil map:\n50 98 2\n52 50 48`;
      const mapType = "seed-to-soil";
      const map = [
        ["50", "98", "2"],
        ["52", "50", "48"],
      ];

      expect(getMap(testInputTxt, mapType)).toEqual(map);
      const testInputTxt1 = `seed: 79 14 55 13\n\nseed-to-soil map:\n50 98 2\n52 50 48\n\nsoil-to-fertilizer map:\n0 15 37\n37 52 2\n39 0 15`;
      const mapType1 = "soil-to-fertilizer";
      const map1 = [
        ["0", "15", "37"],
        ["37", "52", "2"],
        ["39", "0", "15"],
      ];

      expect(getMap(testInputTxt1, mapType1)).toEqual(map1);
    });
    test("original string is not mutated", () => {
      const testInputTxt = `seed: 79 14 55 13\n\nseed-to-soil map:\n50 98 2\n52 50 48`;
      const mapType = "seed-to-soil";

      const copyTestInputTxt = `seed: 79 14 55 13\n\nseed-to-soil map:\n50 98 2\n52 50 48`;
      getMap(testInputTxt, mapType);
      expect(testInputTxt).toBe(copyTestInputTxt);
    });
  });
  describe("getMapTypes()", () => {
    test("returns a list of maptypes", () => {
      const testInputTxt = `seed: 79 14 55 13\n\nseed-to-soil map:\n50 98 2\n52 50 48\n\nsoil-to-fertilizer map:\n0 15 37\n37 52 2\n39 0 15`;
      const mapTypes = ["seed-to-soil", "soil-to-fertilizer"];
      expect(getMapTypes(testInputTxt)).toEqual(mapTypes);
    });
    test("original txt is not mutated", () => {
      const testInputTxt = `seed: 79 14 55 13\n\nseed-to-soil map:\n50 98 2\n52 50 48\n\nsoil-to-fertilizer map:\n0 15 37\n37 52 2\n39 0 15`;
      const copyTestInputTxt = `seed: 79 14 55 13\n\nseed-to-soil map:\n50 98 2\n52 50 48\n\nsoil-to-fertilizer map:\n0 15 37\n37 52 2\n39 0 15`;

      getMapTypes(testInputTxt);
      expect(testInputTxt).toEqual(copyTestInputTxt);
    });
  });
  describe("formatData()", () => {
    test("takes a string, returns rach map on the key of maptypes", () => {
      const testInputTxt = `seeds: 79 14 55 13\n\nseed-to-soil map:\n50 98 2\n52 50 48\n\nsoil-to-fertilizer map:\n0 15 37\n37 52 2\n39 0 15`;
      const mapTypes = {
        "seed-to-soil": [
          ["50", "98", "2"],
          ["52", "50", "48"],
        ],
        "soil-to-fertilizer": [
          ["0", "15", "37"],
          ["37", "52", "2"],
          ["39", "0", "15"],
        ],
      };
      expect(formatData(testInputTxt)).toEqual(mapTypes);
    });
  });
  describe("getSeeds()", () => {
    test("returns the sequence of numbers after seed:", () => {
      const testInputTxt = `seeds: 79 14 55 13\n`;
      const seed = ["79", "14", "55", "13"];

      expect(getSeeds(testInputTxt)).toEqual(seed);
    });
  });
  describe("txtToJSON()", () => {
    beforeAll(() => {
      mock({
        folderName: {
          "test-input.txt": `seeds: 79 14 55 13\n\nseed-to-soil map:\n50 98 2\n52 50 48\n\nsoil-to-fertilizer map:\n0 15 37\n37 52 2\n39 0 15`,
        },
      });
    });

    afterAll(() => {
      mock.restore();
    });

    const filePath = `${process.cwd()}/folderName/test-input`;

    test("new file is created under samename but with json suffix", () => {
      return txtToJSON(filePath).then(() => {
        const result = fs.readdirSync(`${process.cwd()}/folderName`, "utf-8");
        expect(result).toEqual(["test-input.json", "test-input.txt"]);
      });
    });
    test("file data has correct formatting ", () => {
      const resultJSON = {
        seed: ["79", "14", "55", "13"],
        "seed-to-soil": [
          ["50", "98", "2"],
          ["52", "50", "48"],
        ],
        "soil-to-fertilizer": [
          ["0", "15", "37"],
          ["37", "52", "2"],
          ["39", "0", "15"],
        ],
      };

      return txtToJSON(filePath).then(() => {
        const result = fs.readFileSync(`${filePath}.json`, "utf-8");
        expect(JSON.parse(result)).toEqual(resultJSON);
      });
    });
  });
});

describe("part1.js", () => {
  describe("seedToSoil()", () => {
    test("convert seed to soil from a one line map, adds to soil key", () => {
      const sampleData = {
        seed: ["14", "13"],
        "seed-to-soil": [["50", "13", "2"]],
      };
      const sampleDataWithSoil = {
        seed: ["14", "13"],
        "seed-to-soil": [["50", "13", "2"]],
        soil: [51, 50],
      };
      expect(seedToSoil(sampleData)).toEqual(sampleDataWithSoil);
    });
    test("if number remains same if not affected by map", () => {
      const sampleData = {
        seed: ["79", "14", "55", "13"],
        "seed-to-soil": [["50", "13", "2"]],
      };
      const sampleDataWithSoil = {
        seed: ["79", "14", "55", "13"],
        "seed-to-soil": [["50", "13", "2"]],
        soil: [79, 51, 55, 50],
      };
      expect(seedToSoil(sampleData)).toEqual(sampleDataWithSoil);
    });
    test("executes with multiline map", () => {
      const sampleData = {
        seed: ["79", "14", "55", "13"],
        "seed-to-soil": [
          ["50", "98", "2"],
          ["52", "50", "48"],
        ],
      };
      const sampleDataWithSoil = {
        seed: ["79", "14", "55", "13"],
        "seed-to-soil": [
          ["50", "98", "2"],
          ["52", "50", "48"],
        ],
        soil: [81, 14, 57, 13],
      };
      expect(seedToSoil(sampleData)).toEqual(sampleDataWithSoil);
    });
    test("the lines do not interfere with each other", () => {
      const sampleData = {
        seed: ["79", "97", "55", "13"],
        "seed-to-soil": [
          ["50", "98", "2"],
          ["52", "50", "48"],
        ],
      };
      const sampleDataWithSoil = {
        seed: ["79", "97", "55", "13"],
        "seed-to-soil": [
          ["50", "98", "2"],
          ["52", "50", "48"],
        ],
        soil: [81, 99, 57, 13],
      };
      expect(seedToSoil(sampleData)).toEqual(sampleDataWithSoil);
    });
  });
  describe("convert()", () => {
    test("extracted seedToSoil functionality,takes from string and to string, returns conversion on the to key", () => {
      const sampleData = {
        seed: ["14", "13"],
        "seed-to-soil": [["50", "13", "2"]],
      };
      const sampleDataWithSoil = {
        seed: ["14", "13"],
        "seed-to-soil": [["50", "13", "2"]],
        soil: [51, 50],
      };
      expect(convert("seed", "soil", sampleData)).toEqual(sampleDataWithSoil);
    });
  });
});
