const { gameStringToGameObj } = require("../day-2/cubeConundrum");

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
  describe("cubesStrToObj()", () => {});
});
