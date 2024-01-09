const { convertTxtToJSONFile } = require("./data/convertTxtToJson");
const { part1Answer } = require("./part1");

const dataSet = "puzzle-input";

convertTxtToJSONFile(dataSet).then(() => {
  const scratchCards = require(`./data/${dataSet}.json`);
  console.log(part1Answer(scratchCards));
});
