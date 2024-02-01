const {
  getPath,
  getNodes,
  getDirectories,
  formatData,
} = require("../data/formatData");

const { txtToJSON } = require("../../utils/utils");

const { countSteps } = require("../part1");
const { findStartNodes, findNextZ } = require("../part2");

beforeAll(() => {
  return txtToJSON(`${__dirname}/../data/test-input2`, formatData).then(() => {
    return txtToJSON(`${__dirname}/../data/test-input3`, formatData);
  });
});

describe("formatData", () => {
  describe("getPath()", () => {
    test("takes a puzzle string, returns string of 0s and 1s", () => {
      const txt = `LRRLRLR
            AAA = (ZZZ, BBB)`;

      expect(getPath(txt)).toBe(`LRRLRLR`);
    });
  });
  describe("getNodes()", () => {
    test("returns an array of all the nodes", () => {
      const txt = `RL
        
        AAA = (BBB, CCC)
        BBB = (DDD, EEE)
        CCC = (ZZZ, GGG)
        DDD = (DDD, DDD)
        EEE = (EEE, EEE)
        GGG = (GGG, GGG)
        ZZZ = (ZZZ, ZZZ)
        `;

      const nodes = [`AAA`, `BBB`, `CCC`, `DDD`, `EEE`, `GGG`, `ZZZ`];
      expect(getNodes(txt)).toEqual(nodes);
    });
  });
  describe("getDirectories()", () => {
    test("returns an array of all the nodes", () => {
      const txt = `RL
      
      AAA = (BBB, CCC)
      BBB = (DDD, EEE)
      CCC = (ZZZ, GGG)
      DDD = (DDD, DDD)
      EEE = (EEE, EEE)
      GGG = (GGG, GGG)
      ZZZ = (ZZZ, ZZZ)
      `;

      const directories = [
        { L: "BBB", R: "CCC" },
        { L: "DDD", R: "EEE" },
        { L: "ZZZ", R: "GGG" },
        { L: "DDD", R: "DDD" },
        { L: "EEE", R: "EEE" },
        { L: "GGG", R: "GGG" },
        { L: "ZZZ", R: "ZZZ" },
      ];
      expect(getDirectories(txt)).toEqual(directories);
    });
  });
  describe("formatData()", () => {
    test("takes a string, returns a JSON", () => {
      const txt = `RL
        
        AAA = (BBB, CCC)
        BBB = (DDD, EEE)
        CCC = (ZZZ, GGG)
        DDD = (DDD, DDD)
        EEE = (EEE, EEE)
        GGG = (GGG, GGG)
        ZZZ = (ZZZ, ZZZ)
        `;

      const data = {
        path: "RL",
        network: {
          AAA: { L: "BBB", R: "CCC" },
          BBB: { L: "DDD", R: "EEE" },
          CCC: { L: "ZZZ", R: "GGG" },
          DDD: { L: "DDD", R: "DDD" },
          EEE: { L: "EEE", R: "EEE" },
          GGG: { L: "GGG", R: "GGG" },
          ZZZ: { L: "ZZZ", R: "ZZZ" },
        },
      };
      expect(formatData(txt)).toEqual(data);
    });
  });
});
describe("partOne", () => {
  describe("countSteps()", () => {
    const data = {
      path: "RL",
      network: {
        AAA: { L: "BBB", R: "CCC" },
        BBB: { L: "DDD", R: "EEE" },
        CCC: { L: "ZZZ", R: "GGG" },
        DDD: { L: "DDD", R: "GGG" },
        EEE: { L: "DDD", R: "EEE" },
        GGG: { L: "GGG", R: "GGG" },
        ZZZ: { L: "ZZZ", R: "ZZZ" },
      },
    };
    test("takes data, and returns a number for the steps it takes to reach ZZZ", () => {
      expect(countSteps(data)).toBe(2);
    });
    describe("developed countSteps to, have optional parameters", () => {
      test("can optionally take start and end node positions", () => {
        expect(countSteps(data, "BBB", "GGG")).toBe(3);
      });
      test("countSteps is can take regex", () => {
        expect(countSteps(data, "BBB", "..G")).toBe(3);
      });
    });
  });

  test("test data assertion", () => {
    const data = require("../data/test-input2.json");
    expect(countSteps(data)).toBe(6);
  });
});
describe("part two", () => {
  const data = require("../data/test-input3.json");
  describe("findStartNodes", () => {
    test("returns all the nodes that end in the letter A", () => {
      const startNodes = [
        { node: "11A", steps: 0 },
        { node: "22A", steps: 0 },
      ];
      expect(findStartNodes(data)).toEqual(startNodes);
    });
  });
  describe("findNextZ()", () => {
    test("takes the startNodes, updates the steps for each startnode", () => {
      const startNodes = [
        { node: "11A", steps: 0 },
        { node: "22A", steps: 0 },
      ];
      const updatedStartNodes = [
        { node: "11A", steps: 2 },
        { node: "22A", steps: 3 },
      ];
      expect(findNextZ(data, startNodes)).toEqual(updatedStartNodes);
    });
  });
  test("updates steps to the next Z, updates the steps for each startnode", () => {
    const startNodes = [
      { node: "11A", steps: 2 },
      { node: "22A", steps: 3 },
    ];
    const updatedStartNodes = [
      { node: "11A", steps: 2 },
      { node: "22A", steps: 3 },
    ];
    expect(findNextZ(data, startNodes)).toEqual(updatedStartNodes);
  });
});
describe("findSyncedSteps()", () => {
  test("runs findNextZ until the steps are equal", () => {});
});
