const { txtToJSON } = require("./data/txtToJSON");
const { part1Answer } = require("./part1");

txtToJSON(`${__dirname}/data/puzzle-input`).then(() => {
  const data = require("./data/puzzle-input.json");
  console.log(part1Answer(data));
});
