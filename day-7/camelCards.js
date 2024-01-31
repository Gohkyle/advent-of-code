const { txtToJSON } = require("../utils/utils");
const { txtToArr } = require("./data/txtToJSON");
const { partOneAnswer } = require("./part1");
const { partTwoAnswer } = require("./part2");

txtToJSON(`${__dirname}/data/puzzle-input`, txtToArr).then(() => {
  const data = require("./data/puzzle-input.json");
  console.log("part1: ", partOneAnswer(data));
  console.log("part2: ", partTwoAnswer(data));
});
