const { getTxtToJSON, getTxtToJSON2 } = require("./data/txtToJSON");
const fs = require("fs");
const { part1Answer } = require("./part1");
const { part2Answer } = require("./part2");

getTxtToJSON(`${__dirname}/data/puzzle-input`).then(() => {
  const data = require("./data/puzzle-input.json");
  console.log("part1: ", part1Answer(data));
});

getTxtToJSON2(`${__dirname}/data/puzzle-input`).then(() => {
  const data = require("./data/puzzle-input2.json");
  console.log("part2: ", part2Answer(data));
});
