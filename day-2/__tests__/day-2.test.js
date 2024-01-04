const {
  gameStrToGameObj,
  roundStrToObj,
  checkGamePossible,
  sumPossibleGameNo,
  convertsRoundData,
  addMinimumPossible,
  addPower,
  sumPowers,
} = require("../cubeConundrum");

describe("cubeConundrum", () => {
  describe("part-1", () => {
    describe("gameStrToGameObj()", () => {
      test("takes first string and returns object with keys game and gameData", () => {
        const gameArr = [
          "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
        ];
        expect(gameStrToGameObj(gameArr)[0]).toHaveProperty("game");
        expect(gameStrToGameObj(gameArr)[0]).toHaveProperty("gameData");
      });
      test("takes each string and returns object with keys game and gameData", () => {
        const gameArr = [
          "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
          "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
          "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
          "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
          "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
        ];
        const gameObjArr = [
          {
            game: 1,
            gameData: [" 3 blue, 4 red", " 1 red, 2 green, 6 blue", " 2 green"],
          },
          {
            game: 2,
            gameData: [
              " 1 blue, 2 green",
              " 3 green, 4 blue, 1 red",
              " 1 green, 1 blue",
            ],
          },
          {
            game: 3,
            gameData: [
              " 8 green, 6 blue, 20 red",
              " 5 blue, 4 red, 13 green",
              " 5 green, 1 red",
            ],
          },
          {
            game: 4,
            gameData: [
              " 1 green, 3 red, 6 blue",
              " 3 green, 6 red",
              " 3 green, 15 blue, 14 red",
            ],
          },
          {
            game: 5,
            gameData: [" 6 red, 1 blue, 3 green", " 2 blue, 1 red, 2 green"],
          },
        ];
        expect(gameStrToGameObj(gameArr)).toEqual(gameObjArr);
      });
      test("assigns the game number to the game key, as Number", () => {
        const gameArr = [
          "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
          "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
          "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
          "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
          "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
        ];

        gameStrToGameObj(gameArr).forEach(({ game }) => {
          expect(typeof game).toBe("number");
        });
        expect(gameStrToGameObj(gameArr)[0].game).toBe(1);
        expect(gameStrToGameObj(gameArr)[1].game).toBe(2);
        expect(gameStrToGameObj(gameArr)[2].game).toBe(3);
      });
      test("separates the gameData string into an array, and assigns it to gameData", () => {
        const gameArr = [
          "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
        ];

        const expGameData = [
          " 3 blue, 4 red",
          " 1 red, 2 green, 6 blue",
          " 2 green",
        ];
        expect(gameStrToGameObj(gameArr)[0].gameData).toEqual(expGameData);
      });
      test("does not mutate original Array", () => {
        const gameArr = [
          "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
        ];
        const copyGameArr = [
          "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
        ];

        gameStrToGameObj(gameArr);

        expect(gameArr).toEqual(copyGameArr);
      });
      test("returns new array", () => {
        const gameArr = [
          "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
        ];

        expect(gameStrToGameObj(gameArr)).not.toBe(gameArr);
      });
    });
    describe("roundStrToObj()", () => {
      test("turns gameData item string into an object, with keys blue, red, green", () => {
        expect(roundStrToObj()).toHaveProperty("red");
        expect(roundStrToObj()).toHaveProperty("green");
        expect(roundStrToObj()).toHaveProperty("blue");
      });
      test("returns 0 on key when nothing stated", () => {
        expect(roundStrToObj()).toEqual({ red: 0, green: 0, blue: 0 });
      });
      test("returns numbers", () => {
        expect(
          typeof Object.values(roundStrToObj(" 3 green, 15 blue, 14 red"))[0]
        ).toBe("number");
        expect(
          typeof Object.values(roundStrToObj(" 3 green, 15 blue, 14 red"))[1]
        ).toBe("number");
        expect(
          typeof Object.values(roundStrToObj(" 3 green, 15 blue, 14 red"))[2]
        ).toBe("number");
      });
      test(" takes `number red/green/blue` and returns the number as the key to the property red/green/blue", () => {
        expect(roundStrToObj("1 blue")).toEqual({
          red: 0,
          green: 0,
          blue: 1,
        });
      });
      test(" takes multidigit`number red/green/blue` and returns the number as the key to the property red/green/blue", () => {
        expect(roundStrToObj("11 blue")).toEqual({
          red: 0,
          green: 0,
          blue: 11,
        });
      });
      test(" takes multi `number red/green/blue` and returns the number as the key to the property red/green/blue", () => {
        expect(roundStrToObj(" 3 blue, 4 red")).toEqual({
          red: 4,
          green: 0,
          blue: 3,
        });
      });
    });
    describe("convertsRoundData()", () => {
      test("takes gameArr converts gameData array of string to gameData array of objects", () => {
        const gameDataArrOfStr = [
          {
            game: "4",
            gameData: [
              " 1 green, 3 red, 6 blue",
              " 3 green, 6 red",
              " 3 green, 15 blue, 14 red",
            ],
          },
        ];
        const gameDataArrOfObj = [
          {
            game: "4",
            gameData: [
              { red: 3, green: 1, blue: 6 },
              { red: 6, green: 3, blue: 0 },
              { red: 14, green: 3, blue: 15 },
            ],
          },
        ];
        expect(convertsRoundData(gameDataArrOfStr)).toEqual(gameDataArrOfObj);
      });
      test("returns a new array", () => {
        const gameDataStr = [
          {
            game: "4",
            gameData: [
              " 1 green, 3 red, 6 blue",
              " 3 green, 6 red",
              " 3 green, 15 blue, 14 red",
            ],
          },
        ];

        expect(convertsRoundData(gameDataStr)).not.toBe(gameDataStr);
      });
      test("does not mutate original array", () => {
        const gameDataArrOfStr = [
          {
            game: "4",
            gameData: [
              " 1 green, 3 red, 6 blue",
              " 3 green, 6 red",
              " 3 green, 15 blue, 14 red",
            ],
          },
        ];
        const copyGameDataArrOfStr = [
          {
            game: "4",
            gameData: [
              " 1 green, 3 red, 6 blue",
              " 3 green, 6 red",
              " 3 green, 15 blue, 14 red",
            ],
          },
        ];
        convertsRoundData(gameDataArrOfStr);
        expect(gameDataArrOfStr).toEqual(copyGameDataArrOfStr);
      });
    });
    describe("checkGamePossible()", () => {
      test("takes each gameObj and returns a new object with new key: possible", () => {
        const gameArr = [
          {
            game: "1",
            gameData: { red: "4", green: "2", blue: "3" },
          },
        ];

        expect(checkGamePossible(gameArr)[0]).toHaveProperty("possible");
      });
      test("takes each gameObj and returns a new object with new key: possible", () => {
        const gameArr = [
          {
            game: "1",
            gameData: [{ red: "4", green: "2", blue: "3" }],
          },
        ];
        const newGameArr = [
          {
            game: "1",
            gameData: [{ red: "4", green: "2", blue: "3" }],
            possible: true,
          },
        ];
        expect(checkGamePossible(gameArr)).toEqual(newGameArr);
      });
      test("returns true on property possible if the red number is less than or equal redCubes variables", () => {
        const gameArr = [
          {
            game: "1",
            gameData: [{ red: "4", green: "2", blue: "3" }],
          },
        ];
        const newGameArr = [
          {
            game: "1",
            gameData: [{ red: "4", green: "2", blue: "3" }],
            possible: true,
          },
        ];

        const gameArr1 = [
          {
            game: "1",
            gameData: [{ red: "14", green: "2", blue: "3" }],
          },
        ];
        const newGameArr1 = [
          {
            game: "1",
            gameData: [{ red: "14", green: "2", blue: "3" }],
            possible: false,
          },
        ];

        expect(checkGamePossible(gameArr)).toEqual(newGameArr);
        expect(checkGamePossible(gameArr1)).toEqual(newGameArr1);
      });
      test("returns true on property possible if any gameData is less than or equal redCubes variables ", () => {
        const gameArr = [
          {
            game: "1",
            gameData: [{ red: "4", green: "20", blue: "3" }],
          },
        ];
        const newGameArr = [
          {
            game: "1",
            gameData: [{ red: "4", green: "20", blue: "3" }],
            possible: false,
          },
        ];

        const gameArr1 = [
          {
            game: "1",
            gameData: [{ red: "4", green: "2", blue: "30" }],
          },
        ];
        const newGameArr1 = [
          {
            game: "1",
            gameData: [{ red: "4", green: "2", blue: "30" }],
            possible: false,
          },
        ];

        expect(checkGamePossible(gameArr)).toEqual(newGameArr);
        expect(checkGamePossible(gameArr1)).toEqual(newGameArr1);
      });
      test("checkGamePossible over multiple rounds", () => {
        const gameArr = [
          {
            game: 1,
            gameData: [
              { red: 4, green: 0, blue: 3 },
              { red: 1, green: 2, blue: 6 },
              { red: 0, green: 2, blue: 0 },
            ],
          },
        ];
        const newGameArr = [
          {
            game: 1,
            gameData: [
              { red: 4, green: 0, blue: 3 },
              { red: 1, green: 2, blue: 6 },
              { red: 0, green: 2, blue: 0 },
            ],
            possible: true,
          },
        ];
        const gameArr1 = [
          {
            game: 1,
            gameData: [
              { red: 40, green: 0, blue: 3 },
              { red: 1, green: 2, blue: 6 },
              { red: 0, green: 22, blue: 50 },
            ],
          },
        ];
        const newGameArr1 = [
          {
            game: 1,
            gameData: [
              { red: 40, green: 0, blue: 3 },
              { red: 1, green: 2, blue: 6 },
              { red: 0, green: 22, blue: 50 },
            ],
            possible: false,
          },
        ];
        expect(checkGamePossible(gameArr)).toEqual(newGameArr);
        expect(checkGamePossible(gameArr1)).toEqual(newGameArr1);
      });

      test("returns a new object", () => {
        const gameArr = [
          {
            game: "1",
            gameData: [{ red: "4", green: "2", blue: "3" }],
          },
        ];

        expect(checkGamePossible(gameArr)).not.toEqual(gameArr);
      });
      test("does not mutate original object", () => {
        const gameArr = [
          {
            game: "1",
            gameData: [{ red: "4", green: "2", blue: "3" }],
          },
        ];
        const copyGameArr = [
          {
            game: "1",
            gameData: [{ red: "4", green: "2", blue: "3" }],
          },
        ];

        checkGamePossible(gameArr);
        expect(gameArr).toEqual(copyGameArr);
      });
    });
    describe("sumPossibleGameNo()", () => {
      test("returns 0 for no data", () => {
        expect(sumPossibleGameNo([])).toBe(0);
      });
      test("returns sum of game number with true values on possible property for no data", () => {
        const testData = [
          {
            game: 1,
            gameData: [
              { red: 4, green: 0, blue: 3 },
              { red: 1, green: 2, blue: 6 },
              { red: 0, green: 2, blue: 0 },
            ],
            possible: true,
          },
          {
            game: 2,
            gameData: [
              { red: 0, green: 2, blue: 1 },
              { red: 1, green: 3, blue: 4 },
              { red: 0, green: 1, blue: 1 },
            ],
            possible: true,
          },
          {
            game: 3,
            gameData: [
              { red: 20, green: 8, blue: 6 },
              { red: 4, green: 13, blue: 5 },
              { red: 1, green: 5, blue: 0 },
            ],
            possible: false,
          },
          {
            game: 4,
            gameData: [
              { red: 3, green: 1, blue: 6 },
              { red: 6, green: 3, blue: 0 },
              { red: 14, green: 3, blue: 15 },
            ],
            possible: false,
          },
          {
            game: 5,
            gameData: [
              { red: 6, green: 3, blue: 1 },
              { red: 1, green: 2, blue: 2 },
            ],
            possible: true,
          },
        ];
        expect(sumPossibleGameNo(testData)).toBe(8);
      });
    });
  });
  describe("part-2", () => {
    describe("addMinimumPossible()", () => {
      test("takes the gameArr and returns a new key gameMin", () => {
        const gameArr = [
          {
            game: 1,
            gameData: [
              { red: 4, green: 0, blue: 3 },
              { red: 1, green: 2, blue: 6 },
              { red: 0, green: 2, blue: 0 },
            ],
            possible: true,
          },
          {
            game: 2,
            gameData: [
              { red: 0, green: 2, blue: 1 },
              { red: 1, green: 3, blue: 4 },
              { red: 0, green: 1, blue: 1 },
            ],
            possible: true,
          },
        ];

        addMinimumPossible(gameArr).forEach((gameObj) => {
          expect(gameObj).toHaveProperty("gameMin");
          expect(gameObj.gameMin).toHaveProperty("red");
          expect(gameObj.gameMin).toHaveProperty("green");
          expect(gameObj.gameMin).toHaveProperty("blue");
        });
      });
      test("searches through gameData and assigns the highest number to gameMin object", () => {
        const gameArr = [
          {
            game: 1,
            gameData: [
              { red: 4, green: 0, blue: 3 },
              { red: 1, green: 2, blue: 6 },
              { red: 0, green: 2, blue: 0 },
            ],
            possible: true,
          },
          {
            game: 2,
            gameData: [
              { red: 0, green: 2, blue: 1 },
              { red: 1, green: 3, blue: 4 },
              { red: 0, green: 1, blue: 1 },
            ],
            possible: true,
          },
        ];
        const newGameArr = [
          {
            game: 1,
            gameData: [
              { red: 4, green: 0, blue: 3 },
              { red: 1, green: 2, blue: 6 },
              { red: 0, green: 2, blue: 0 },
            ],
            possible: true,
            gameMin: { red: 4, green: 2, blue: 6 },
          },
          {
            game: 2,
            gameData: [
              { red: 0, green: 2, blue: 1 },
              { red: 1, green: 3, blue: 4 },
              { red: 0, green: 1, blue: 1 },
            ],
            possible: true,
            gameMin: { red: 1, green: 3, blue: 4 },
          },
        ];
        expect(addMinimumPossible(gameArr)).toEqual(newGameArr);
      });
      test("returns a new array", () => {
        const gameArr = [
          {
            game: 1,
            gameData: [
              { red: 4, green: 0, blue: 3 },
              { red: 1, green: 2, blue: 6 },
              { red: 0, green: 2, blue: 0 },
            ],
            possible: true,
          },
          {
            game: 2,
            gameData: [
              { red: 0, green: 2, blue: 1 },
              { red: 1, green: 3, blue: 4 },
              { red: 0, green: 1, blue: 1 },
            ],
            possible: true,
          },
        ];
        expect(addMinimumPossible(gameArr)).not.toEqual(gameArr);
      });
      test("does not mutate original array", () => {
        const gameArr = [
          {
            game: 1,
            gameData: [
              { red: 4, green: 0, blue: 3 },
              { red: 1, green: 2, blue: 6 },
              { red: 0, green: 2, blue: 0 },
            ],
            possible: true,
          },
          {
            game: 2,
            gameData: [
              { red: 0, green: 2, blue: 1 },
              { red: 1, green: 3, blue: 4 },
              { red: 0, green: 1, blue: 1 },
            ],
            possible: true,
          },
        ];
        const copyGameArr = [
          {
            game: 1,
            gameData: [
              { red: 4, green: 0, blue: 3 },
              { red: 1, green: 2, blue: 6 },
              { red: 0, green: 2, blue: 0 },
            ],
            possible: true,
          },
          {
            game: 2,
            gameData: [
              { red: 0, green: 2, blue: 1 },
              { red: 1, green: 3, blue: 4 },
              { red: 0, green: 1, blue: 1 },
            ],
            possible: true,
          },
        ];
        addMinimumPossible(gameArr);
        expect(gameArr).toEqual(copyGameArr);
      });
    });
    describe("addPower()", () => {
      test("updates each gameObj with key of power", () => {
        const gameArr = [
          {
            game: 1,
            gameData: [
              { red: 4, green: 0, blue: 3 },
              { red: 1, green: 2, blue: 6 },
              { red: 0, green: 2, blue: 0 },
            ],
            possible: true,
            gameMin: { red: 4, green: 2, blue: 6 },
          },
          {
            game: 2,
            gameData: [
              { red: 0, green: 2, blue: 1 },
              { red: 1, green: 3, blue: 4 },
              { red: 0, green: 1, blue: 1 },
            ],
            possible: true,
            gameMin: { red: 1, green: 3, blue: 4 },
          },
        ];
        addPower(gameArr).forEach((gameObj) => {
          expect(gameObj).toHaveProperty("power");
        });
      });
      test("value of power is the product of gameMin values", () => {
        const gameArr = [
          {
            game: 1,
            gameData: [
              { red: 4, green: 0, blue: 3 },
              { red: 1, green: 2, blue: 6 },
              { red: 0, green: 2, blue: 0 },
            ],
            possible: true,
            gameMin: { red: 4, green: 2, blue: 6 },
          },
          {
            game: 2,
            gameData: [
              { red: 0, green: 2, blue: 1 },
              { red: 1, green: 3, blue: 4 },
              { red: 0, green: 1, blue: 1 },
            ],
            possible: true,
            gameMin: { red: 1, green: 3, blue: 4 },
          },
        ];

        expect(addPower(gameArr)[0].power).toBe(48);
        expect(addPower(gameArr)[1].power).toBe(12);
      });
      test("returns a new array", () => {
        const gameArr = [
          {
            game: 1,
            gameData: [
              { red: 4, green: 0, blue: 3 },
              { red: 1, green: 2, blue: 6 },
              { red: 0, green: 2, blue: 0 },
            ],
            gameMin: { red: 4, green: 2, blue: 6 },
          },
          {
            game: 2,
            gameData: [
              { red: 0, green: 2, blue: 1 },
              { red: 1, green: 3, blue: 4 },
              { red: 0, green: 1, blue: 1 },
            ],
            gameMin: { red: 1, green: 3, blue: 4 },
          },
        ];
        expect(addPower(gameArr)).not.toEqual(gameArr);
      });
      test("does not mutate original array", () => {
        const gameArr = [
          {
            game: 1,
            gameData: [
              { red: 4, green: 0, blue: 3 },
              { red: 1, green: 2, blue: 6 },
              { red: 0, green: 2, blue: 0 },
            ],
            gameMin: { red: 4, green: 2, blue: 6 },
          },
          {
            game: 2,
            gameData: [
              { red: 0, green: 2, blue: 1 },
              { red: 1, green: 3, blue: 4 },
              { red: 0, green: 1, blue: 1 },
            ],
            gameMin: { red: 1, green: 3, blue: 4 },
          },
        ];
        const copyGameArr = [
          {
            game: 1,
            gameData: [
              { red: 4, green: 0, blue: 3 },
              { red: 1, green: 2, blue: 6 },
              { red: 0, green: 2, blue: 0 },
            ],
            gameMin: { red: 4, green: 2, blue: 6 },
          },
          {
            game: 2,
            gameData: [
              { red: 0, green: 2, blue: 1 },
              { red: 1, green: 3, blue: 4 },
              { red: 0, green: 1, blue: 1 },
            ],
            gameMin: { red: 1, green: 3, blue: 4 },
          },
        ];
        addPower(gameArr);
        expect(gameArr).toEqual(copyGameArr);
      });
    });
  });
  describe("sumPowers()", () => {
    test("returns the sum of all the powers", () => {
      const gameArr = [
        {
          game: 1,
          gameData: [[Object], [Object], [Object]],
          gameMin: { red: 4, green: 2, blue: 6 },
          power: 48,
        },
        {
          game: 2,
          gameData: [[Object], [Object], [Object]],
          gameMin: { red: 1, green: 3, blue: 4 },
          power: 12,
        },
        {
          game: 3,
          gameData: [[Object], [Object], [Object]],
          gameMin: { red: 20, green: 13, blue: 6 },
          power: 1560,
        },
        {
          game: 4,
          gameData: [[Object], [Object], [Object]],
          gameMin: { red: 14, green: 3, blue: 15 },
          power: 630,
        },
        {
          game: 5,
          gameData: [[Object], [Object]],
          gameMin: { red: 6, green: 3, blue: 2 },
          power: 36,
        },
      ];
      expect(sumPowers(gameArr)).toBe(2286);
    });
  });
});
