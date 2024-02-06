const { laGrangeInterpolation } = require("./part1");

const partTwoAnswer = (data) => {
  return data.reduce((sum, sequence) => {
    return sum + laGrangeInterpolation(sequence, -1);
  }, 0);
};

module.exports = { partTwoAnswer };
