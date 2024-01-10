const { txtToJSON } = require("./data/txtToJSON");
const { part1Answer } = require("./part1");

txtToJSON(`${__dirname}/data/puzzle-input`).then((data) => {
  console.log(part1Answer(data));
});
