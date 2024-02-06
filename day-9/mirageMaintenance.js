const { txtToJSON } = require("../utils/utils");
const { getSequences } = require("./data/formatData");
const { partOneAnswer } = require("./part1");
const { partTwoAnswer } = require("./part2");

txtToJSON(`${__dirname}/data/puzzle-input`, getSequences).then(() => {
  const data = require("./data/puzzle-input.json");
  console.log(partOneAnswer(data));
  console.log(partTwoAnswer(data));
});
