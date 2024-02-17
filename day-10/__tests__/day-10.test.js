const { txtToJSON } = require("../../utils/utils");
const { getPipes } = require("../data/formatData");
const {
  getS,
  getRoute,
  checkDirection,
  getDisplacement,
  partOneAnswer,
} = require("../part1");
const { getArea, getBoundaries, getInteriorPts } = require("../part2");

async function getData() {
  await txtToJSON(`${__dirname}/../data/test-input1`, getPipes);
  await txtToJSON(`${__dirname}/../data/test-input1a`, getPipes);
  await txtToJSON(`${__dirname}/../data/test-input2`, getPipes);
  await txtToJSON(`${__dirname}/../data/test-input2a`, getPipes);
  await txtToJSON(`${__dirname}/../data/test-input3`, getPipes);
  await txtToJSON(`${__dirname}/../data/test-input4`, getPipes);
}

beforeAll(() => {
  return getData();
});

describe("formatData", () => {
  describe("getPipes()", () => {
    test("takes a txt string, returns an array of arrays to represent it as a grid", () => {
      const txt = `.....\n.F-7.\n.|.|.\n.L-J.\n.....`;
      const pipes = [
        [".", ".", ".", ".", "."],
        [".", "F", "-", "7", "."],
        [".", "|", ".", "|", "."],
        [".", "L", "-", "J", "."],
        [".", ".", ".", ".", "."],
      ];
      expect(getPipes(txt)).toEqual(pipes);
    });
  });
});

describe("part1", () => {
  describe("getS()", () => {
    test("takes a pipe array, and returns the coordinated for the start position", () => {
      const testPipes = require("../data/test-input1.json");
      const testPipes1 = require("../data/test-input2.json");
      const coordinates = [1, 1];
      const coordinates1 = [2, 0];

      expect(getS(testPipes)).toEqual(coordinates);
      expect(getS(testPipes1)).toEqual(coordinates1);
    });
  });
  describe("getRoute()", () => {
    test("takes a pipes array and and coordinates and returns an array of the path of the pipes loop", () => {
      const testPipes = require("../data/test-input1.json");
      const route = [
        [1, 1],
        [1, 2],
        [1, 3],
        [2, 3],
        [3, 3],
        [3, 2],
        [3, 1],
        [2, 1],
        [1, 1],
      ];
      expect(getRoute(testPipes)).toEqual(route);
    });
  });
  describe("checkPosition()", () => {
    test("check the North Position, returns with the pipe, if there is a receiving pipe", () => {
      const testPipes = require("../data/test-input1.json");
      expect(checkDirection(testPipes, [3, 1], "N")).toEqual(true);
    });
    test("check the North Position, returns null, if there is not a receiving pipe", () => {
      const testPipes = require("../data/test-input1.json");
      expect(checkDirection(testPipes, [3, 2], "N")).toBe(false);
    });
    test("check the East Position, returns with the pipe, if there is a receiving pipe", () => {
      const testPipes = require("../data/test-input1.json");
      expect(checkDirection(testPipes, [3, 1], "E")).toEqual(true);
    });
    test("check the East Position, returns null, if there is not a receiving pipe", () => {
      const testPipes = require("../data/test-input1.json");
      expect(checkDirection(testPipes, [2, 3], "E")).toBe(false);
    });
    test("check the South Position, returns with the feasible pipe, if there is a receiving pipe", () => {
      const testPipes = require("../data/test-input1.json");
      expect(checkDirection(testPipes, [1, 3], "S")).toEqual(true);
    });
    test("check the South Position, returns null, if there is not a receiving pipe", () => {
      const testPipes = require("../data/test-input1.json");
      expect(checkDirection(testPipes, [1, 2], "S")).toBe(false);
    });
    test("check the West Position, returns with the feasiable pipe, if there is a receiving pipe", () => {
      const testPipes = require("../data/test-input1.json");
      expect(checkDirection(testPipes, [3, 3], "W")).toBe(true);
    });
    test("check the West Position, returns null, if there is not a receiving pipe", () => {
      const testPipes = require("../data/test-input1.json");
      expect(checkDirection(testPipes, [2, 1], "W")).toBe(false);
    });
  });
  describe("getDisplacement()", () => {
    describe("takes the last two coordinates from an route array, and returns the displacement", () => {
      test("positive y", () => {
        const route = [
          [1, 1],
          [2, 1],
        ];
        const displacement = [1, 0];
        expect(getDisplacement(route)).toEqual(displacement);
      });
      test("negative y", () => {
        const route = [
          [2, 1],
          [1, 1],
        ];
        const displacement = [-1, 0];
        expect(getDisplacement(route)).toEqual(displacement);
      });
      test("positive x", () => {
        const route = [
          [1, 1],
          [1, 2],
        ];
        const displacement = [0, 1];
        expect(getDisplacement(route)).toEqual(displacement);
      });
      test("negative x", () => {
        const route = [
          [1, 2],
          [1, 1],
        ];
        const displacement = [0, -1];
        expect(getDisplacement(route)).toEqual(displacement);
      });
    });
    test("returns a new array", () => {
      const route = [
        [1, 2],
        [1, 1],
      ];

      expect(getDisplacement(route)).not.toEqual(route);
    });
    test("does not mutuate original array", () => {});
    const route = [
      [1, 2],
      [1, 1],
    ];
    const copyRoute = [
      [1, 2],
      [1, 1],
    ];

    getDisplacement(route);
    expect(route).toEqual(copyRoute);
  });
  describe("getRoute()", () => {
    describe("at S", () => {
      test("can detect east path from start position", () => {
        const pipes = [
          [".", ".", ".", ".", "."],
          [".", "S", "-", "S", "."],
          [".", "|", ".", "|", "."],
          [".", "L", "-", "J", "."],
          [".", ".", ".", ".", "."],
        ];
        const step1 = [1, 2];
        expect(getRoute(pipes)[1]).toEqual(step1);
      });
      test("can detect south path from start position", () => {
        const pipes = [
          [".", ".", ".", ".", "."],
          [".", "F", "-", "S", "."],
          [".", "|", ".", "|", "."],
          [".", "L", "-", "J", "."],
          [".", ".", ".", ".", "."],
        ];
        const step1 = [2, 3];
        expect(getRoute(pipes)[1]).toEqual(step1);
      });
      test("can detect north path from start position", () => {
        const pipes = [
          [".", ".", ".", ".", "."],
          [".", "F", "-", "7", "."],
          [".", "S", ".", "|", "."],
          [".", "L", "-", "J", "."],
          [".", ".", ".", ".", "."],
        ];
        const step1 = [1, 1];
        expect(getRoute(pipes)[1]).toEqual(step1);
      });
      test("can detect west path from start position", () => {
        const pipes = [
          [".", ".", ".", ".", "."],
          [".", "F", "-", "7", "."],
          [".", "|", ".", "|", "."],
          [".", "L", "S", "|", "."],
          [".", ".", ".", "S", "."],
        ];
        const step1 = [3, 1];
        expect(getRoute(pipes)[1]).toEqual(step1);
      });
    });
    describe("at not S", () => {
      describe("|:", () => {
        test("south bound:", () => {
          const pipes = [
            [".", ".", ".", ".", "."],
            [".", "S", ".", "7", "."],
            [".", "|", ".", "|", "."],
            [".", "S", "-", "J", "."],
            [".", ".", ".", ".", "."],
          ];
          const step2 = [3, 1];
          expect(getRoute(pipes)[2]).toEqual(step2);
        });
        test("north bound:", () => {
          const pipes = [
            [".", ".", ".", ".", "."],
            [".", "S", ".", "S", "."],
            [".", "|", ".", "|", "."],
            [".", "L", "-", "J", "."],
            [".", ".", ".", ".", "."],
          ];
          const step6 = [1, 3];
          expect(getRoute(pipes)[6]).toEqual(step6);
        });
      });
      describe("-:", () => {
        test("east bound:", () => {
          const pipes = [
            [".", ".", ".", ".", "."],
            [".", "S", "-", "S", "."],
            [".", "|", ".", "|", "."],
            [".", "L", "-", "J", "."],
            [".", ".", ".", ".", "."],
          ];
          const step2 = [1, 3];
          expect(getRoute(pipes)[2]).toEqual(step2);
        });
        test("west bound:", () => {
          const pipes = [
            [".", ".", ".", ".", "."],
            [".", ".", "-", "S", "."],
            [".", "S", ".", "|", "."],
            [".", "L", "-", "J", "."],
            [".", ".", ".", ".", "."],
          ];
          const step4 = [3, 1];
          expect(getRoute(pipes)[4]).toEqual(step4);
        });
      });
      describe("L:", () => {
        test("east bound:", () => {
          const pipes = [
            [".", ".", ".", ".", "."],
            [".", ".", "-", "7", "."],
            [".", "S", ".", "|", "."],
            [".", "L", "S", "J", "."],
            [".", ".", ".", ".", "."],
          ];
          const step2 = [3, 2];
          expect(getRoute(pipes)[2]).toEqual(step2);
        });
        test("north bound:", () => {
          const pipes = [
            [".", ".", ".", ".", "."],
            [".", "F", "-", "7", "."],
            [".", "|", ".", "|", "."],
            [".", "L", "S", "|", "."],
            [".", ".", ".", "S", "."],
          ];
          const step2 = [2, 1];
          expect(getRoute(pipes)[2]).toEqual(step2);
        });
      });
      describe("J:", () => {
        test("west bound:", () => {
          const pipes = [
            [".", ".", ".", ".", "."],
            [".", "F", "-", ".", "."],
            [".", "|", ".", "S", "."],
            [".", "L", "S", "J", "."],
            [".", ".", ".", ".", "."],
          ];
          const step2 = [3, 2];
          expect(getRoute(pipes)[2]).toEqual(step2);
        });
        test("north bound:", () => {
          const pipes = [
            [".", ".", ".", ".", "."],
            [".", "F", "-", "7", "."],
            [".", "|", ".", "|", "."],
            [".", "L", "S", "J", "."],
            [".", ".", ".", ".", "."],
          ];
          const step2 = [2, 3];
          expect(getRoute(pipes)[2]).toEqual(step2);
        });
      });
      describe("7:", () => {
        test("west bound:", () => {
          const pipes = [
            [".", ".", ".", ".", "."],
            [".", "F", "-", "7", "."],
            [".", "|", ".", "S", "."],
            [".", "L", "-", "J", "."],
            [".", ".", ".", ".", "."],
          ];
          const step2 = [1, 2];
          expect(getRoute(pipes)[2]).toEqual(step2);
        });
        test("south bound:", () => {
          const pipes = [
            [".", ".", ".", ".", "."],
            [".", "F", "S", "7", "."],
            [".", "|", ".", "S", "."],
            [".", "L", "-", "J", "."],
            [".", ".", ".", ".", "."],
          ];
          const step2 = [2, 3];
          expect(getRoute(pipes)[2]).toEqual(step2);
        });
      });
      describe("F:", () => {
        test("east bound:", () => {
          const pipes = [
            [".", ".", ".", ".", "."],
            [".", "F", "-", "7", "."],
            [".", "S", ".", "|", "."],
            [".", "L", "-", "J", "."],
            [".", ".", ".", ".", "."],
          ];
          const step2 = [1, 2];
          expect(getRoute(pipes)[2]).toEqual(step2);
        });
        test("south bound:", () => {
          const pipes = [
            [".", ".", ".", ".", "."],
            [".", "F", "S", ".", "."],
            [".", "S", ".", "-", "."],
            [".", "L", "-", "J", "."],
            [".", ".", ".", ".", "."],
          ];
          const step2 = [2, 1];
          expect(getRoute(pipes)[2]).toEqual(step2);
        });
      });
    });
  });
  test("testData assertion", () => {
    const testPipes = require("../data/test-input1.json");
    const testPipesA = require("../data/test-input1a.json");
    const testPipes1A = require("../data/test-input2a.json");
    const testPipes1 = require("../data/test-input2.json");
    expect(partOneAnswer(testPipesA)).toBe(4);
    expect(partOneAnswer(testPipes1A)).toBe(8);
    expect(partOneAnswer(testPipes)).toBe(4);
    expect(partOneAnswer(testPipes1)).toBe(8);
  });
});

describe("part2", () => {
  describe("getArea", () => {
    test("returns the area enclosed by coordinates using shoe lace theorem", () => {
      const array = [
        [1, 1],
        [1, 2],
        [2, 2],
        [2, 1],
      ];
      const array1 = [
        [1, 6],
        [3, 1],
        [7, 2],
        [4, 4],
        [8, 5],
      ];

      const array2 = [
        [3, 1],
        [7, 2],
        [4, 4],
        [8, 6],
        [1, 7],
      ];
      const array3 = [
        [3, 1],
        [4, 3],
        [7, 2],
        [4, 4],
        [8, 6],
        [1, 7],
      ];
      const array4 = [
        [1, 1],
        [1, 2],
        [1, 3],
        [2, 3],
        [2, 2],
        [2, 1],
      ];
      expect(getArea(array)).toBe(1);
      expect(getArea(array1)).toBe(16.5);
      expect(getArea(array2)).toBe(20.5);
      expect(getArea(array3)).toBe(17);
      expect(getArea(array4)).toBe(2);
    });
  });
  describe("getInteriorPts", () => {
    test("returns the number of pipe pieces", () => {
      const testPipes1 = require(`../data/test-input2.json`);
      const testPipes = require(`../data/test-input1.json`);
      const testPipes3 = require(`../data/test-input3.json`);

      expect(getInteriorPts(getRoute(testPipes))).toBe(8);
      expect(getInteriorPts(getRoute(testPipes1))).toBe(16);
      expect(getInteriorPts(getRoute(testPipes3))).toBe(46);
    });
  });
});
