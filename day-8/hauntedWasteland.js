const { txtToJSON } = require("../utils/utils");
const { formatData } = require("./data/formatData");
const { countSteps } = require("./part1");
const { partTwoAnswer } = require("./part2");

txtToJSON(`${__dirname}/data/puzzle-input`, formatData).then(() => {
  const data = require("./data/puzzle-input.json");
  console.log(countSteps(data));
  console.log(partTwoAnswer(data));
});
