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
  convertNum,
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
const {
  setNewSeed,
  mapRange,
  convertRanges,
  seedToSoilR,
  soilToFertR,
  fertToWaterR,
  waterToLightR,
  lightToTempR,
  tempToHumidityR,
} = require("../part2");
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
  describe("convertNum()", () => {
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
      expect(convertNum("seed", "soil", sampleData)).toEqual(
        sampleDataWithSoil
      );
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
      const sampleDataWithSoil = convertNum("seed", "soil", sampleData);

      expect(convertNum("soil", "fertilizer", sampleDataWithSoil)).toEqual(
        sampleDataWithFert
      );
    });
  });
  describe("convertF", () => {
    test("returns a function", () => {
      expect(typeof convertF("seed", "soil", convertNum)).toBe("function");
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
      const facSeedToSoil = convertF("seed", "soil", convertNum);

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
      const facSeedToSoil = convertF("seed", "soil", convertNum);

      expect(facSeedToSoil(sampleData)).toEqual(sampleDataWithSoil);
    });
    test("can take other functions such as convertRanges function", () => {
      const sampleData = {
        seed: ["14", "13"],
        "seed-to-soil": [["50", "13", "2"]],
      };
      const sampleDataWithSoil = {
        seed: [[14, 26]],
        "seed-to-soil": [["50", "13", "2"]],
        soil: [
          [51, 51],
          [15, 26],
        ],
      };
      const seedRange = setNewSeed(sampleData);

      const facSeedToSoilR = convertF("seed", "soil", convertRanges);

      expect(facSeedToSoilR(seedRange)).toEqual(sampleDataWithSoil);
    });
  });
  describe("mapNumber()", () => {
    test("takes a number and a bunch of ranges and returns new number", () => {
      const ranges = [["1", "8", "2"]];

      expect(mapNumber(9, ranges)).toBe(2);
    });
    test("takes a number and a bunch of ranges and returns the number if no map", () => {
      const ranges = [["90, 12, 9"]];

      expect(mapNumber(9, ranges)).toBe(9);
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
  describe.only("mapRanges()", () => {
    describe("checks single map against range, and produces new ranges", () => {
      describe("mapping converts the entire range", () => {
        test("map covers the exact range", () => {
          const range = [79, 92];

          const map = [["50", "79", "14"]];
          const newRange = [[50, 63]];

          expect(mapRange(range, map)).toEqual(newRange);
        });
        test("map covers more than the range", () => {
          const range = [79, 92];
          const map1 = [["50", "78", "16"]];
          const newRange1 = [[51, 64]];

          expect(mapRange(range, map1)).toEqual(newRange1);
        });
      });
      describe("mapping is out of the range", () => {
        test("map is greater than the entire range", () => {
          const range = [79, 92];
          const map = [["50", "94", "14"]];

          const newRange = [[79, 92]];

          expect(mapRange(range, map)).toEqual(newRange);
        });
        test("map is less than the entire range", () => {
          const range = [79, 92];
          const map = [["50", "13", "14"]];

          const newRange = [[79, 92]];

          expect(mapRange(range, map)).toEqual(newRange);
        });
        test("only returns original range, if no mapping matches any ranges", () => {
          const map1 = [
            ["50", "98", "2"],
            ["52", "50", "48"],
          ];
          const range1 = [79, 82];

          const newRange1 = [[81, 84]];
          expect(mapRange(range1, map1)).toEqual(newRange1);
        });
      });
      describe("mapping occurs for a part of the range", () => {
        test("mapping is within the range", () => {
          const range = [79, 92];
          const map = [["50", "83", "3"]];

          const newRange = [
            [79, 82],
            [50, 52],
            [86, 92],
          ];

          expect(mapRange(range, map)).toEqual(newRange);
        });
        describe("maps over the upper limit", () => {
          test("maps part of the range at the upper limit", () => {
            const range = [79, 92];
            const map = [["50", "90", "14"]];

            const newRange = [
              [79, 89],
              [50, 52],
            ];
            expect(mapRange(range, map)).toEqual(newRange);
          });
          test("edge case: map starts at the end of a range", () => {
            const range = [79, 92];
            const map = [["50", "92", "14"]];

            const newRange = [
              [79, 91],
              [50, 50],
            ];
            expect(mapRange(range, map)).toEqual(newRange);
          });

          test("edge case: map starts at beginning of range, ends greater than the end of the range", () => {
            const range = [79, 92];
            const map = [["50", "79", "20"]];

            const newRange = [[50, 63]];

            expect(mapRange(range, map)).toEqual(newRange);
          });
          test("edge case: entire map is at the end of the range", () => {
            const range = [79, 92];
            const map = [["50", "92", "1"]];

            const newRange = [
              [79, 91],
              [92, 92],
            ];
            expect(mapRange(range, map)).toEqual(newRange);
          });
          test("edge case: map ends at the end of the range", () => {
            const range = [79, 92];
            const map = [["50", "90", "3"]];

            const newRange = [
              [79, 89],
              [50, 52],
            ];
            expect(mapRange(range, map)).toEqual(newRange);
          });
          test("edge case: map ends at the end of the range, map starts less than the start range", () => {
            const range = [79, 92];
            const map = [["50", "75", "30"]];

            const newRange = [[54, 67]];
            expect(mapRange(range, map)).toEqual(newRange);
          });
        });
        describe("maps over the lower limit", () => {
          test("map part of the range at the lower limit", () => {
            const range = [79, 92];
            const map = [["50", "70", "14"]];

            const newRange = [
              [59, 63],
              [84, 92],
            ];
            expect(mapRange(range, map)).toEqual(newRange);
          });
          test("map part of the range at the lower limit, edge case: map ends at the start of a range", () => {
            const range = [79, 92];

            const map = [["50", "70", "10"]];
            const newRange = [
              [59, 59],
              [80, 92],
            ];
            expect(mapRange(range, map)).toEqual(newRange);
          });

          test("edge case: map starts at the start of a range", () => {
            const range = [79, 92];
            const map = [["50", "79", "10"]];
            const newRange = [
              [50, 59],
              [89, 92],
            ];

            expect(mapRange(range, map)).toEqual(newRange);
          });
          test("edge case: map starts at the beginning of a range, ends greater than the end of the range", () => {
            const range = [79, 92];
            const map = [["50", "79", "15"]];
            const newRange = [[51, 64]];
            expect(mapRange(range, map)).toEqual(newRange);
          });

          test("edge case: map ends at the end of a range", () => {
            const range = [79, 92];
            const map = [["50", "78", "15"]];
            const newRange = [[51, 64]];
            expect(mapRange(range, map)).toEqual(newRange);
          });
          test("edge case: map starts and ends at the beginning of a range", () => {
            const range = [79, 92];
            const map = [["50", "79", "1"]];
            const newRange = [
              [50, 50],
              [80, 92],
            ];
            expect(mapRange(range, map)).toEqual(newRange);
          });
        });
      });
    });
    describe("checks multiple maps against range", () => {
      test("maps order does not affect result", () => {
        const range = [10, 20];
        const map = [
          [10015, 15, 4],
          [100, 0, 4],
        ];
        const newRange = [
          [10, 14],
          [10015, 10018],
          [19, 20],
        ];
        expect(mapRange(range, map)).toEqual(newRange);
      });
      test(" map not in range, with other maps in range", () => {
        const range = [10, 20];
        const map = [
          [100, 0, 4],
          [10015, 15, 4],
        ];
        const newRange = [
          [10, 14],
          [10015, 10018],
          [19, 20],
        ];
        expect(mapRange(range, map)).toEqual(newRange);
      });
      test("map over lower range limit + gap in maps+ map in range", () => {
        const range = [10, 20];
        const map = [
          [1008, 8, 4],
          [10015, 15, 4],
        ];

        const newRange = [
          [1010, 1011],
          [12, 14],
          [10015, 100018],
          [19, 20],
        ];
        expect(mapRange(range, map)).toEqual(newRange);
      });
      test("map over lower range limit + map in range consecutively", () => {
        const range = [10, 20];
        const map = [
          [1008, 8, 4],
          [1012, 12, 4],
        ];

        const newRange = [
          [1010, 1011],
          [10012, 10015],
          [16, 20],
        ];
        expect(mapRange(range, map)).toEqual(newRange);
      });
      test("map over lower range limit + gap in maps+ map over upper range limit", () => {
        const range = [10, 20];
        const map = [
          [1008, 8, 4],
          [10018, 18, 4],
        ];

        const newRange = [
          [1010, 1011],
          [12, 17],
          [10018, 10020],
        ];
        expect(mapRange(range, map)).toEqual(newRange);
      });
      test("map over lower range limit + map over upper range limit consecutively", () => {
        const range = [10, 20];
        const map = [
          [1008, 8, 8],
          [10016, 16, 8],
        ];

        const newRange = [
          [1010, 1015],
          [10016, 10020],
        ];
        expect(mapRange(range, map)).toEqual(newRange);
      });
      test("map in range + map over upper range limit with a gap in the range", () => {
        const range = [10, 20];
        const map = [
          [1012, 12, 2],
          [10016, 16, 8],
        ];

        const newRange = [
          [10, 11],
          [1012, 1013],
          [14, 15],
          [10016, 10020],
        ];
        expect(mapRange(range, map)).toEqual(newRange);
      });
      test("map in range + map over upper range limit consecutively", () => {
        const range = [10, 20];
        const map = [
          [1012, 12, 4],
          [10016, 16, 8],
        ];

        const newRange = [
          [10, 11],
          [1012, 1015],
          [10016, 10020],
        ];
        expect(mapRange(range, map)).toEqual(newRange);
      });
      test("random data assertion", () => {
        const range = [10, 20];
        const map = [
          [1000, 8, 4],
          [100, 0, 4],
          [10000, 15, 4],
          [0, 19, 6],
        ];

        const newRange = [
          [1002, 1003],
          [12, 14],
          [10000, 10003],
          [0, 1],
        ];

        expect(mapRange(range, map)).toEqual(newRange);
      });
    });
    test("unxpected behaviour", () => {
      const range = [74, 87];

      const map = [
        ["45", "77", "23"],
        ["81", "45", "19"],
        ["68", "64", "13"],
      ];
      const newRange = [
        [78, 80],
        [45, 55],
      ];
      expect(mapRange(range, map)).toEqual(newRange);
    });
    test("the original arrays is not mutated", () => {
      const range = [10, 20];
      const map = [
        [1000, 8, 4],
        [100, 0, 4],
        [10000, 15, 4],
        [0, 19, 6],
      ];
      const copyRange = [10, 20];
      const copyMap = [
        [1000, 8, 4],
        [100, 0, 4],
        [10000, 15, 4],
        [0, 19, 6],
      ];
      mapRange(range, map);
      expect(map).toEqual(copyMap);
      expect(range).toEqual(copyRange);
    });
    test("returns new array", () => {
      const range = [10, 20];
      const map = [
        [1000, 8, 4],
        [100, 0, 4],
        [10000, 15, 4],
        [0, 19, 6],
      ];
      expect(mapRange(range, map)).not.toEqual(range);
      expect(mapRange(range, map)).not.toEqual(map);
    });
  });
  describe("convertRanges()", () => {
    test("takes the data and convert ranges for the given from and to arguments", () => {
      const sampleData = {
        seed: ["14", "13"],
        "seed-to-soil": [["50", "13", "2"]],
      };
      const sampleDataWithSoil = {
        seed: [[14, 26]],
        "seed-to-soil": [["50", "13", "2"]],
        soil: [
          [51, 51],
          [15, 26],
        ],
      };
      const seedsRange = setNewSeed(sampleData);
      expect(convertRanges("seed", "soil", seedsRange)).toEqual(
        sampleDataWithSoil
      );
    });
  });
  describe("test data assertion", () => {
    const testDataWithSeedR = setNewSeed(testData);
    const testDataWithSoilR = seedToSoilR(testDataWithSeedR);
    const testDataWithFertilizerR = soilToFertR(testDataWithSoilR);
    const testDataWithWaterR = fertToWaterR(testDataWithFertilizerR);
    const testDataWithLightR = waterToLightR(testDataWithWaterR);
    const testDataWithTemperatureR = lightToTempR(testDataWithLightR);
    const testDataWithHumidityR = tempToHumidityR(testDataWithTemperatureR);

    test("seed-to-soil", () => {
      const sampleDataWithSeed = {
        "seed-to-soil": [
          ["50", "98", "2"],
          ["52", "50", "48"],
        ],
        seed: [
          [79, 92],
          [55, 67],
        ],
      };

      const sampleDataWithSoil = {
        "seed-to-soil": [
          ["50", "98", "2"],
          ["52", "50", "48"],
        ],
        soil: [
          [81, 94],
          [57, 69],
        ],
        seed: [
          [79, 92],
          [55, 67],
        ],
      };

      expect(seedToSoilR(sampleDataWithSeed)).toEqual(sampleDataWithSoil);
    });
    test("soil-to-fertilizer", () => {
      const sampleDataWithSoil = {
        soil: [
          [81, 94],
          [57, 69],
        ],
        "soil-to-fertilizer": [
          ["0", "15", "37"],
          ["37", "52", "2"],
          ["39", "0", "15"],
        ],
      };
      const sampleDataWithFert = {
        "soil-to-fertilizer": [
          ["0", "15", "37"],
          ["37", "52", "2"],
          ["39", "0", "15"],
        ],
        soil: [
          [81, 94],
          [57, 69],
        ],
        fertilizer: [
          [81, 94],
          [57, 69],
        ],
      };

      expect(soilToFertR(sampleDataWithSoil)).toEqual(sampleDataWithFert);
    });
    test("fertilizer-to-water", () => {
      const sampleWithFert = {
        "fertilizer-to-water": [
          ["49", "53", "8"],
          ["0", "11", "42"],
          ["42", "0", "7"],
          ["57", "7", "4"],
        ],
        fertilizer: [
          [81, 94],
          [57, 69],
        ],
      };
      const sampleDataWithWater = {
        "fertilizer-to-water": [
          ["49", "53", "8"],
          ["0", "11", "42"],
          ["42", "0", "7"],
          ["57", "7", "4"],
        ],
        fertilizer: [
          [81, 94],
          [57, 69],
        ],
        water: [
          [81, 94],
          [53, 56],
          [61, 69],
        ],
      };

      expect(fertToWaterR(sampleWithFert)).toEqual(sampleDataWithWater);
    });
    test("water-to-light", () => {
      const updatedWithLightR = {
        ...testDataWithWaterR,
        light: [
          [74, 87],
          [46, 49],
          [54, 62],
        ],
      };
      expect(waterToLightR(testDataWithWaterR)).toEqual(updatedWithLightR);
    });
    test("light-to-temperature", () => {
      const updatedWithTemperatureR = {
        ...testDataWithLightR,
        temperature: [
          [78, 80],
          [45, 55],
          [82, 85],
          [90, 98],
        ],
      };
      expect(lightToTempR(testDataWithLightR)).toEqual(updatedWithTemperatureR);
    });
    test("temperature-to-humidity", () => {
      const updatedWithHumidityR = {
        ...testDataWithTemperatureR,
        humidity: [
          [78, 80],
          [46, 56],
          [82, 85],
          [90, 98],
        ],
      };
      expect(tempToHumidityR(testDataWithTemperatureR)).toEqual(
        updatedWithHumidityR
      );
    });
    test("humidity-to-location", () => {
      const updatedWithLocation = {
        ...testDataWithHumidity,
        location: [
          [82, 84],
          [46, 56],
          [86, 89],
          [94, 96],
          [56, 59],
          [97, 98],
        ],
      };
      expect(humidityToLocationR(testDataWithHumidityR)).toEqual(
        updatedWithLocationR
      );
    });
  });
});
