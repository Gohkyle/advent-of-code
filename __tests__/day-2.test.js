const {
  gameStringToGameObj,
  cubesStrToObj,
} = require("../day-2/cubeConundrum");

describe("cubeConundrum", () => {
  describe("gameStrToGameObj()", () => {
    test("takes a string and returns object with keys game and gameData", () => {
      const gameStr = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";
      expect(gameStringToGameObj(gameStr)).toHaveProperty("game");
      expect(gameStringToGameObj(gameStr)).toHaveProperty("gameData");
    });
    test("assigns the game number to the game key", () => {
      const gameStr = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";

      expect(gameStringToGameObj(gameStr).game).toBe("1");
    });
    test("separates the gameData string into an array, and assigns it to gameData", () => {
      const gameStr = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";

      const expGameData = [
        " 3 blue, 4 red",
        " 1 red, 2 green, 6 blue",
        " 2 green",
      ];
      expect(gameStringToGameObj(gameStr).gameData).toEqual(expGameData);
    });
    test("does not mutate original string", () => {
      const gameStr = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";
      const copyGameStr =
        "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";

      gameStringToGameObj(gameStr);
      expect(gameStr).toBe(copyGameStr);
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
    test(" takes `number red/green/blue` and returns the number as the key to the property red/green/blue", () => {
      expect(cubesStrToObj("1 blue")).toEqual({
        red: 0,
        green: 0,
        blue: "1",
      });
    });
    test(" takes multi `number red/green/blue` and returns the number as the key to the property red/green/blue", () => {
      expect(cubesStrToObj(" 3 blue, 4 red")).toEqual({
        red: "4",
        green: 0,
        blue: "3",
      });
    });
  });
});
