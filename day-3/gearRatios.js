const { getTotal, getNonPartsTotal } = require("./part1");

const input = require("./data/input.json");
const { findGearParts, findGears, sumGearRatios } = require("./part2");
function answerPart1(data) {
  return getTotal(data) - getNonPartsTotal(data);
}

console.log(answerPart1(input));

function answerPart2(data) {
  const parts = findGearParts(data);
  const gears = findGears(parts);

  return sumGearRatios(gears);
}
console.log(answerPart2(input));
