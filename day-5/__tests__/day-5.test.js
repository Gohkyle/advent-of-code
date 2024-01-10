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
const { seedToSoil, convert, findMin, getLocation } = require("../part1");

const testData = require("../data/test-input.json");
const { setNewSeed, updateSeedOnAlmanac, part2Answer } = require("../part2");
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
    test("works with other maps", () => {
      const sampleData = {
        "seed-to-soil": [
          ["50", "98", "2"],
          ["52", "50", "48"],
        ],
        "soil-to-fertilizer": [
          ["0", "15", "37"],
          ["37", "52", "2"],
          ["39", "0", "15"],
        ],
        seed: ["79", "14", "55", "13"],
      };
      const sampleDataWithFert = {
        "seed-to-soil": [
          ["50", "98", "2"],
          ["52", "50", "48"],
        ],
        "soil-to-fertilizer": [
          ["0", "15", "37"],
          ["37", "52", "2"],
          ["39", "0", "15"],
        ],
        seed: ["79", "14", "55", "13"],
        soil: [81, 14, 57, 13],
        fertilizer: [81, 53, 57, 52],
      };
      const sampleDataWithSoil = convert("seed", "soil", sampleData);

      expect(convert("soil", "fertilizer", sampleDataWithSoil)).toEqual(
        sampleDataWithFert
      );
    });
    test("this was failing, when I had else statements", () => {
      const sampleDataWithWater = {
        "fertilizer-to-water": [
          ["49", "53", "8"],
          ["0", "11", "42"],
          ["42", "0", "7"],
          ["57", "7", "4"],
        ],
        fertilizer: [81, 53, 57, 52],
        water: [81, 49, 53, 41],
      };
      const sampleWithFert = {
        "fertilizer-to-water": [
          ["49", "53", "8"],
          ["0", "11", "42"],
          ["42", "0", "7"],
          ["57", "7", "4"],
        ],
        fertilizer: [81, 53, 57, 52],
      };
    });
  });
  describe("data assertion", () => {
    const testDataWithSoil = convert("seed", "soil", testData);
    const testDataWithFertilizer = convert(
      "soil",
      "fertilizer",
      testDataWithSoil
    );
    const testDataWithWater = convert(
      "fertilizer",
      "water",
      testDataWithFertilizer
    );
    const testDataWithLight = convert("water", "light", testDataWithWater);
    const testDataWithTemperature = convert(
      "light",
      "temperature",
      testDataWithLight
    );
    const testDataWithHumidity = convert(
      "temperature",
      "humidity",
      testDataWithTemperature
    );

    test("fertilizer-to-water", () => {
      const sampleDataWithWater = {
        "fertilizer-to-water": [
          ["49", "53", "8"],
          ["0", "11", "42"],
          ["42", "0", "7"],
          ["57", "7", "4"],
        ],
        fertilizer: [81, 53, 57, 52],
        water: [81, 49, 53, 41],
      };
      const sampleWithFert = {
        "fertilizer-to-water": [
          ["49", "53", "8"],
          ["0", "11", "42"],
          ["42", "0", "7"],
          ["57", "7", "4"],
        ],
        fertilizer: [81, 53, 57, 52],
      };

      expect(convert("fertilizer", "water", sampleWithFert)).toEqual(
        sampleDataWithWater
      );
    });
    test("water-to-light", () => {
      const updatedWithLight = {
        ...testDataWithWater,
        light: [74, 42, 46, 34],
      };
      expect(convert("water", "light", testDataWithWater)).toEqual(
        updatedWithLight
      );
    });
    test("light-to-temperature", () => {
      const updatedWithTemperature = {
        ...testDataWithLight,
        temperature: [78, 42, 82, 34],
      };
      expect(convert("light", "temperature", testDataWithLight)).toEqual(
        updatedWithTemperature
      );
    });
    test("temperature-to-humidity", () => {
      const updatedWithHumidity = {
        ...testDataWithTemperature,
        humidity: [78, 43, 82, 35],
      };
      expect(
        convert("temperature", "humidity", testDataWithTemperature)
      ).toEqual(updatedWithHumidity);
    });
    test("humidity-to-location", () => {
      const updatedWithLocation = {
        ...testDataWithHumidity,
        location: [82, 43, 86, 35],
      };
      expect(convert("humidity", "location", testDataWithHumidity)).toEqual(
        updatedWithLocation
      );
    });
  });
  describe("findMin()", () => {
    test("for an array of numbers, returns the lowest number", () => {
      const numbers = [0, 1, 2, 3];
      expect(findMin(numbers)).toBe(0);

      const location = getLocation(testData);
      expect(findMin(location)).toBe(35);
    });
  });
});

describe("part2.js", () => {
  describe("setNewSeed()", () => {
    test("returns array of two arrays, first array being the start values, and the second array being the ranges", () => {
      const data = { seed: ["79", "14", "55", "13"] };
      const newSeeds = [
        ["79", "55"],
        ["14", "13"],
      ];
      expect(setNewSeed(data)).toEqual(newSeeds);
    });
  });
  describe("updateSeedOnAlmanac()", () => {
    test("populates the seed with a range of numbers", () => {
      const data = { seed: ["79", "14", "55", "13"] };
      const updatedAlmanac = {
        seed: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      };
      expect(updateSeedOnAlmanac(data, 3, 12)).toEqual(updatedAlmanac);
    });
    test("returns a new obj", () => {
      const data = { seed: ["79", "14", "55", "13"] };
      expect(updateSeedOnAlmanac(data, 3, 12)).not.toEqual(data);
    });
    test("does not mutate original obj", () => {
      const data = { seed: ["79", "14", "55", "13"] };
      const copyData = { seed: ["79", "14", "55", "13"] };
      updateSeedOnAlmanac(data, 3, 12);
      expect(data).toEqual(copyData);
    });
    test("works for boths string and number input", () => {
      const data = { seed: ["79", "14", "55", "13"] };
      const updatedAlmanac = {
        seed: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      };
      expect(updateSeedOnAlmanac(data, "3", "12")).toEqual(updatedAlmanac);
    });
  });
  describe("data test assertion ", () => {
    expect(part2Answer(testData)).toBe(46);
  });
});
