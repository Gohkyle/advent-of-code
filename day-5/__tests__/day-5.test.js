const {
  getMapRegex,
  getMap,
  getMapTypes,
  formatData,
  getSeeds,
} = require("../data/txtToJSON");

describe("getMapRegex()", () => {
  test("takes a string, returns regex expression with embedded string ", () => {
    expect(getMapRegex("seed-to-soil")).toBe(
      "(?<=seed-to-soil map:\\n(\\d+ \\d+ \\d+\\n)*)(\\d+ \\d+ \\d+)"
    );
  });
});
describe("getMap", () => {
  test("extracts an array from string for the given map type", () => {
    const testInputTxt = `seeds: 79 14 55 13\n\nseed-to-soil map:\n50 98 2\n52 50 48`;
    const mapType = "seed-to-soil";
    const map = [
      ["50", "98", "2"],
      ["52", "50", "48"],
    ];

    expect(getMap(testInputTxt, mapType)).toEqual(map);
    const testInputTxt1 = `seeds: 79 14 55 13\n\nseed-to-soil map:\n50 98 2\n52 50 48\n\nsoil-to-fertilizer map:\n0 15 37\n37 52 2\n39 0 15`;
    const mapType1 = "soil-to-fertilizer";
    const map1 = [
      ["0", "15", "37"],
      ["37", "52", "2"],
      ["39", "0", "15"],
    ];

    expect(getMap(testInputTxt1, mapType1)).toEqual(map1);
  });
  describe("getMapTypes()", () => {
    test("returns a list of maptypes", () => {
      const testInputTxt = `seeds: 79 14 55 13\n\nseed-to-soil map:\n50 98 2\n52 50 48\n\nsoil-to-fertilizer map:\n0 15 37\n37 52 2\n39 0 15`;
      const mapTypes = ["seed-to-soil", "soil-to-fertilizer"];
      expect(getMapTypes(testInputTxt)).toEqual(mapTypes);
    });
  });
  describe("formatData()", () => {
    test("takes maptypes array, returns map on the key of maptypes, for each maptype", () => {
      const testInputTxt = `seeds: 79 14 55 13\n\nseed-to-soil map:\n50 98 2\n52 50 48\n\nsoil-to-fertilizer map:\n0 15 37\n37 52 2\n39 0 15`;
      const mapTypes = [
        {
          "seed-to-soil": [
            ["50", "98", "2"],
            ["52", "50", "48"],
          ],
        },
        {
          "soil-to-fertilizer": [
            ["0", "15", "37"],
            ["37", "52", "2"],
            ["39", "0", "15"],
          ],
        },
      ];
      expect(formatData(testInputTxt)).toEqual(mapTypes);
    });
    describe("getSeeds()", () => {
      test("returns the sequence of numbers after seed:", () => {
        const testInputTxt = `seeds: 79 14 55 13\n`;
        const seeds = ["79", "14", "55", "13"];

        expect(getSeeds(testInputTxt)).toEqual(seeds);
      });
    });
  });
});
