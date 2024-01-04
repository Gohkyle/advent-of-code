const {
  gameStringToGameObj,
  cubesStrToObj,
  checkGamePossible,
  sumPossibleGameNo,
  convertsRoundData,
} = require("../day-2/cubeConundrum");

describe("cubeConundrum", () => {
  describe("gameStrToGameObj()", () => {
    test("takes first string and returns object with keys game and gameData", () => {
      const gameArr = [
        "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
      ];
      expect(gameStringToGameObj(gameArr)[0]).toHaveProperty("game");
      expect(gameStringToGameObj(gameArr)[0]).toHaveProperty("gameData");
    });
    test("takes each string and returns object with keys game and gameData", () => {
      const gameArr = [
        "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
        "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
        "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
        "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
        "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
      ];

      gameStringToGameObj(gameArr).forEach((gameStr) => {
        expect(gameStr).toHaveProperty("game");
        expect(gameStr).toHaveProperty("gameData");
      });
    });
    test("assigns the game number to the game key, as Number", () => {
      const gameArr = [
        "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
        "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
        "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
        "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
        "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
      ];

      gameStringToGameObj(gameArr).forEach(({ game }) => {
        expect(typeof game).toBe("number");
      });
      expect(gameStringToGameObj(gameArr)[0].game).toBe(1);
      expect(gameStringToGameObj(gameArr)[1].game).toBe(2);
      expect(gameStringToGameObj(gameArr)[2].game).toBe(3);
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
      expect(gameStringToGameObj(gameArr)[0].gameData).toEqual(expGameData);
    });
    test("does not mutate original Array", () => {
      const gameArr = [
        "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
      ];
      const copyGameArr = [
        "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
      ];

      gameStringToGameObj(gameArr);

      expect(gameArr).toEqual(copyGameArr);
    });
    test("returns new array", () => {
      const gameArr = [
        "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
      ];

      expect(gameStringToGameObj(gameArr)).not.toBe(gameArr);
    });
  });
  describe("cubesStrToObj()", () => {
    test("turns string into an object, with keys blue, red, green", () => {
      expect(cubesStrToObj()).toHaveProperty("red");
      expect(cubesStrToObj()).toHaveProperty("green");
      expect(cubesStrToObj()).toHaveProperty("blue");
    });
    test("returns 0 on key when nothing stated", () => {
      expect(cubesStrToObj()).toEqual({ red: 0, green: 0, blue: 0 });
    });
    test("returns numbers", () => {
      console.log(Object.values(cubesStrToObj(" 3 green, 15 blue, 14 red"))[0]);
      expect(
        typeof Object.values(cubesStrToObj(" 3 green, 15 blue, 14 red"))[0]
      ).toBe("number");
      expect(
        typeof Object.values(cubesStrToObj(" 3 green, 15 blue, 14 red"))[1]
      ).toBe("number");
      expect(
        typeof Object.values(cubesStrToObj(" 3 green, 15 blue, 14 red"))[2]
      ).toBe("number");
    });
    test(" takes `number red/green/blue` and returns the number as the key to the property red/green/blue", () => {
      expect(cubesStrToObj("1 blue")).toEqual({
        red: 0,
        green: 0,
        blue: 1,
      });
    });
    test(" takes multidigit`number red/green/blue` and returns the number as the key to the property red/green/blue", () => {
      expect(cubesStrToObj("11 blue")).toEqual({
        red: 0,
        green: 0,
        blue: 11,
      });
    });
    test(" takes multi `number red/green/blue` and returns the number as the key to the property red/green/blue", () => {
      expect(cubesStrToObj(" 3 blue, 4 red")).toEqual({
        red: 4,
        green: 0,
        blue: 3,
      });
    });
  });
  describe("convertsRoundData()", () => {
    test("takes a gameObj returns gameData array of string to gameData array of objects", () => {
      const gameDataArrOfStr = {
        game: "4",
        gameData: [
          " 1 green, 3 red, 6 blue",
          " 3 green, 6 red",
          " 3 green, 15 blue, 14 red",
        ],
      };
      const gameDataArrOfObj = {
        game: "4",
        gameData: [
          { red: "3", green: "1", blue: "6" },
          { red: "6", green: "3", blue: 0 },
          { red: "14", green: "3", blue: "15" },
        ],
      };
      expect(convertsRoundData(gameDataArrOfStr)).toEqual(gameDataArrOfObj);
    });
    test("returns a new array", () => {});
    test("does not mutate original array", () => {});
  });
  describe("checkGamePossible()", () => {
    test("takes gameObj and returns a new object with new key: possible", () => {
      const gameObj = {
        game: "1",
        gameData: { red: "4", green: "2", blue: "3" },
      };

      expect(checkGamePossible(gameObj)).toHaveProperty("possible");
    });
    test("takes gameObj and returns a new object with new key: possible", () => {
      const gameObj = {
        game: "1",
        gameData: { red: "4", green: "2", blue: "3" },
      };
      const newGameObj = {
        game: "1",
        gameData: { red: "4", green: "2", blue: "3" },
        possible: true,
      };
      expect(checkGamePossible(gameObj)).toEqual(newGameObj);
    });
    test("returns true on property possible if the red number is less than or equal redCubes variables ", () => {
      const gameObj = {
        game: "1",
        gameData: { red: "4", green: "2", blue: "3" },
      };
      const newGameObj = {
        game: "1",
        gameData: { red: "4", green: "2", blue: "3" },
        possible: true,
      };

      const gameObj1 = {
        game: "1",
        gameData: { red: "14", green: "2", blue: "3" },
      };
      const newGameObj1 = {
        game: "1",
        gameData: { red: "14", green: "2", blue: "3" },
        possible: false,
      };

      expect(checkGamePossible(gameObj)).toEqual(newGameObj);
      expect(checkGamePossible(gameObj1)).toEqual(newGameObj1);
    });
    test("returns true on property possible if any gameData is less than or equal redCubes variables ", () => {
      const gameObj = {
        game: "1",
        gameData: { red: "4", green: "20", blue: "3" },
      };
      const newGameObj = {
        game: "1",
        gameData: { red: "4", green: "20", blue: "3" },
        possible: false,
      };

      const gameObj1 = {
        game: "1",
        gameData: { red: "4", green: "2", blue: "30" },
      };
      const newGameObj1 = {
        game: "1",
        gameData: { red: "4", green: "2", blue: "30" },
        possible: false,
      };

      expect(checkGamePossible(gameObj)).toEqual(newGameObj);
      expect(checkGamePossible(gameObj1)).toEqual(newGameObj1);
    });
    test("returns a new object", () => {
      const gameObj = {
        game: "1",
        gameData: { red: "4", green: "2", blue: "3" },
      };

      expect(checkGamePossible(gameObj)).not.toEqual(gameObj);
    });
    test("does not mutate original object", () => {
      const gameObj = {
        game: "1",
        gameData: { red: "4", green: "2", blue: "3" },
      };
      const copyGameObj = {
        game: "1",
        gameData: { red: "4", green: "2", blue: "3" },
      };

      checkGamePossible(gameObj);
      expect(gameObj).toEqual(copyGameObj);
    });
  });
  describe("sumPossibleGameNo()", () => {
    test("returns 0 for no data", () => {
      expect(sumPossibleGameNo()).toBe(0);
    });
    test("returns sum of game number with true values on possible property for no data", () => {
      const testData = [
        {
          game: "1",
          gameData: { red: "4", green: "2", blue: "3" },
          possible: true,
        },
        {
          game: "2",
          gameData: { red: "1", green: "2", blue: "1" },
          possible: true,
        },
        {
          game: "3",
          gameData: { red: "20", green: "8", blue: "6" },
          possible: false,
        },
        {
          game: "4",
          gameData: { red: "3", green: "1", blue: "6" },
          possible: true,
        },
        {
          game: "5",
          gameData: { red: "6", green: "3", blue: "1" },
          possible: true,
        },
      ];
      expect(sumPossibleGameNo(testData)).toBe(8);
    });
  });
});
