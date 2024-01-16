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
const {
  seedToSoil,
  convert,
  findMin,
  getLocation,
  mapNumber,
  convertF,
  soilToFert,
  fertToWater,
  waterToLight,
  lightToTemp,
  tempToHumidity,
  humidityToLocation,
} = require("../part1");

const testData = require("../data/test-input.json");
const { setNewSeed, convertRanges, mapRange } = require("../part2");
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
  });
  describe("convertF", () => {
    test("returns a function", () => {
      expect(typeof convertF("seed", "soil")).toBe("function");
    });
    test("function returned, can do the same as seedToSoil", () => {
      const sampleData = {
        seed: ["14", "13"],
        "seed-to-soil": [["50", "13", "2"]],
      };
      const sampleDataWithSoil = {
        seed: ["14", "13"],
        "seed-to-soil": [["50", "13", "2"]],
        soil: [51, 50],
      };
      const facSeedToSoil = convertF("seed", "soil");

      expect(facSeedToSoil(sampleData)).toEqual(sampleDataWithSoil);
    });
    test("function returned, can map soil to fertilizer", () => {
      const sampleData = {
        seed: ["14", "13"],
        "seed-to-soil": [["50", "13", "2"]],
      };
      const sampleDataWithSoil = {
        seed: ["14", "13"],
        "seed-to-soil": [["50", "13", "2"]],
        soil: [51, 50],
      };
      const facSeedToSoil = convertF("seed", "soil");

      expect(facSeedToSoil(sampleData)).toEqual(sampleDataWithSoil);
    });
  });
  describe("mapNumber()", () => {
    test("returns an object, with keys number and mapIndex", () => {
      const ranges = [["1", "8", "2"]];

      expect(mapNumber(9, ranges)).toHaveProperty("number");
      expect(mapNumber(9, ranges)).toHaveProperty("mapIndex");
    });
    test("takes a number and a bunch of ranges and returns new number", () => {
      const ranges = [["1", "8", "2"]];

      expect(mapNumber(9, ranges).number).toEqual(2);
    });
    test("takes a number and a bunch of ranges and returns the number if no map", () => {
      const ranges = [["90, 12, 9"]];

      expect(mapNumber(9, ranges).number).toBe(9);
    });
  });
  describe("data assertion", () => {
    const testDataWithSoil = seedToSoil(testData);
    const testDataWithFertilizer = soilToFert(testDataWithSoil);
    const testDataWithWater = fertToWater(testDataWithFertilizer);
    const testDataWithLight = waterToLight(testDataWithWater);
    const testDataWithTemperature = lightToTemp(testDataWithLight);
    const testDataWithHumidity = tempToHumidity(testDataWithTemperature);

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

      expect(fertToWater(sampleWithFert)).toEqual(sampleDataWithWater);
    });
    test("water-to-light", () => {
      const updatedWithLight = {
        ...testDataWithWater,
        light: [74, 42, 46, 34],
      };
      expect(waterToLight(testDataWithWater)).toEqual(updatedWithLight);
    });
    test("light-to-temperature", () => {
      const updatedWithTemperature = {
        ...testDataWithLight,
        temperature: [78, 42, 82, 34],
      };
      expect(lightToTemp(testDataWithLight)).toEqual(updatedWithTemperature);
    });
    test("temperature-to-humidity", () => {
      const updatedWithHumidity = {
        ...testDataWithTemperature,
        humidity: [78, 43, 82, 35],
      };
      expect(tempToHumidity(testDataWithTemperature)).toEqual(
        updatedWithHumidity
      );
    });
    test("humidity-to-location", () => {
      const updatedWithLocation = {
        ...testDataWithHumidity,
        location: [82, 43, 86, 35],
      };
      expect(humidityToLocation(testDataWithHumidity)).toEqual(
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
    test("returns new data Object with seedRanges", () => {
      const data = { seed: ["79", "14", "55", "13"] };
      const updatedData = {
        seed: [
          [79, 92],
          [55, 67],
        ],
      };
      expect(setNewSeed(data)).toEqual(updatedData);
      expect(setNewSeed(data).seed).toHaveLength(data.seed.length / 2);
    });
    test("returns a new object", () => {
      const data = { seed: ["79", "14", "55", "13"] };

      expect(setNewSeed(data)).not.toEqual(data);
    });
    test("does not mutate original obj", () => {
      const data = { seed: ["79", "14", "55", "13"] };
      const copyData = { seed: ["79", "14", "55", "13"] };

      setNewSeed(data);
      expect(data).toEqual(copyData);
    });
  });
  describe("mapRanges()", () => {
    describe("checks single map against range, and produces new ranges", () => {
      test("mapping converts the entire range", () => {
        const range = [[79, 92]];
        const map = [["50", "79", "14"]];

        const newRange = [[50, 63]];

        expect(mapRange(range, map)).toEqual(newRange);
      });
      test("mapping is out of the range", () => {
        const range = [[79, 92]];
        const map = [["50", "94", "14"]];

        const newRange = [[79, 92]];

        expect(mapRange(range, map)).toEqual(newRange);
      });
      describe("mapping occurs for a part of the range", () => {
        test("mapping converts the entire range", () => {
          const range = [[79, 92]];
          const map = [["50", "83", "3"]];

          const newRange = [
            [79, 82],
            [50, 52],
            [86, 92],
          ];

          expect(mapRange(range, map)).toEqual(newRange);
        });
        test("maps part of the range at the upper limit", () => {
          const range = [[79, 92]];
          const map = [["50", "90", "14"]];

          const newRange = [
            [79, 89],
            [50, 52],
          ];
          expect(mapRange(range, map)).toEqual(newRange);
        });
        test("maps part of the range at the upper limit, edge cases", () => {
          const range = [[79, 92]];
          const map = [["50", "92", "14"]];

          const newRange = [
            [79, 91],
            [50, 50],
          ];
          const map1 = [["50", "90", "4"]];

          const newRange1 = [
            [79, 89],
            [50, 52],
          ];
          expect(mapRange(range, map)).toEqual(newRange);
          expect(mapRange(range, map1)).toEqual(newRange1);
        });

        test("map part of the range at the lower limit", () => {
          const range = [[79, 92]];
          const map = [["50", "70", "14"]];

          const newRange = [
            [59, 63],
            [84, 92],
          ];
          expect(mapRange(range, map)).toEqual(newRange);
        });
        test("map part of the range at the lower limit, edge cases", () => {
          const range = [[79, 92]];

          const map = [["50", "70", "10"]];
          const newRange = [
            [59, 59],
            [80, 92],
          ];

          const map1 = [["50", "79", "10"]];
          const newRange1 = [
            [50, 59],
            [89, 92],
          ];
          expect(mapRange(range, map)).toEqual(newRange);
          expect(mapRange(range, map1)).toEqual(newRange1);
        });
      });
    });
    test("checks multiple maps against range", () => {
      const range = [[10, 20]];
      const map = [
        [100, 0, 4],
        [1000, 8, 4],
        [10000, 15, 4],
      ];

      const newRange = [
        [1010, 1011],
        [12, 14],
        [10015, 10019],
        [20, 20],
      ];

      expect(mapRange(range, map)).toEqual(newRange);
    });
  });
  describe("findSubRanges()", () => {
    describe("takes a map and ranges, returns a new ranges array, with subdivisions according to the map", () => {
      test("", () => {
        const range = [10, 20];

        const map = [
          [100, 0, 4],
          [1000, 8, 4],
          [10000, 15, 4],
        ];

        const newRange = [
          [10, 11],
          [12, 14],
          [15, 19],
          [20, 20],
        ];
      });
    });
  });
});
