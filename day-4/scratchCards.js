const { convertTxtToJSONFile } = require("./data/convertTxtToJson");
const { part1Answer } = require("./part1");
const { part2Answer } = require("./part2");

const dataSet = "puzzle-input";

convertTxtToJSONFile(dataSet).then(() => {
  const scratchCards = require(`./data/${dataSet}.json`);
  console.log("part1:", part1Answer(scratchCards));
  console.log("part2:", part2Answer(scratchCards));
});
