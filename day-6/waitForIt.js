const { getTxtToJSON } = require("./data/txtToJSON");
const fs = require("fs");
const { part1Answer } = require("./part1");

getTxtToJSON(`${__dirname}/data/puzzle-input`).then(() => {
  const data = require("./data/puzzle-input.json");
  console.log(part1Answer(data));
});
