const { txtToJSON } = require("../utils/utils");
const { getPipes } = require("./data/formatData");
const { partOneAnswer } = require("./part1");
const { partTwoAnswer } = require("./part2");

async function answer() {
  await txtToJSON(`${__dirname}/data/puzzle-input`, getPipes);

  const data = require("./data/puzzle-input.json");
  console.log(partOneAnswer(data));
  console.log(partTwoAnswer(data));
}

answer();
