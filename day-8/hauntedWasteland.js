const { txtToJSON } = require("../utils/utils");
const { formatData } = require("./data/formatData");
const { countSteps } = require("./part1");

txtToJSON(`${__dirname}/data/puzzle-input`, formatData).then(() => {
  const data = require("./data/puzzle-input.json");
  console.log(countSteps(data));
});
