const { getTotal, getNonPartsTotal } = require("./part1");

const input = require("./data/input.json");
function answerPart1(data) {
  return getTotal(data) - getNonPartsTotal(data);
}

console.log(answerPart1(input));
