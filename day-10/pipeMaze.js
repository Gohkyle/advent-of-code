const { txtToJSON } = require("../utils/utils");
const { getPipes } = require("./data/formatData");
const { partOneAnswer, getRoute } = require("./part1");

async function answer() {
  await txtToJSON(`${__dirname}/data/puzzle-input`, getPipes);

  const data = require("./data/puzzle-input.json");
  console.log(partOneAnswer(data));
}

answer();
