const { findMin, part1Answer } = require("./part1");

const setNewSeed = ({ seed }) => {
  const startValues = [];
  const ranges = [];
  seed.forEach((value, index) => {
    if (index % 2 === 0) {
      startValues.push(value);
    } else ranges.push(value);
  });
  return [startValues, ranges];
};

const updateSeedOnAlmanac = (almanac, seedStart, seedRange) => {
  return {
    ...almanac,
    seed: Array.from(new Array(+seedRange), (_, i) => +seedStart + i),
  };
};

const part2Answer = (data) => {
  const [seedStarts, seedRanges] = setNewSeed(data);

  const locationMins = seedStarts.map((seedStart, index) => {
    const newAlmanac = updateSeedOnAlmanac(data, seedStart, seedRanges[index]);
    return part1Answer(newAlmanac);
  });

  return findMin(locationMins);
};
module.exports = { setNewSeed, updateSeedOnAlmanac, part2Answer };
