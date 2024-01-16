const { mapNumber } = require("./part1");

const setNewSeed = (data) => {
  const seed = [];
  for (let i = 0; i < data.seed.length; i += 2) {
    const lower = +data.seed[i];
    const upper = +data.seed[i] + +data.seed[i + 1] - 1;
    seed.push([lower, upper]);
  }

  return { ...data, seed };
};

const mapRange = ([range], maps) => {
  const [lowerR, upperR] = range;

  const subRanges = maps.map((map) => {
    return +map[1];
  });
  console.log(subRanges);

  const newRanges = [];

  maps.forEach((map) => {
    const lowerM = +map[1];
    const upperM = lowerM + +map[2] - 1;
    const conversion = +map[0] - +map[1];

    const isLowerMInR = lowerM >= lowerR && lowerM <= upperR;
    const isUpperMInR = upperM <= upperR && upperM >= lowerR;

    if (isLowerMInR && isUpperMInR) {
      if (lowerM !== lowerR) {
        newRanges.push([lowerR, lowerM - 1]);
      }
      newRanges.push([lowerM + conversion, upperM + conversion]);

      if (upperM !== upperR) {
        newRanges.push([upperM + 1, upperR]);
      }
    } else if (isLowerMInR && !isUpperMInR) {
      newRanges.push([lowerR, lowerM - 1]);
      newRanges.push([lowerM + conversion, upperR + conversion]);
    } else if (!isLowerMInR && isUpperMInR) {
      newRanges.push([lowerR + conversion, upperM + conversion]);
      newRanges.push([upperM + 1, upperR]);
    } else newRanges.push([lowerR, upperR]);
  });
  console.log(newRanges);
  return newRanges;
};
//need to map ranges
//binary searches?

module.exports = { setNewSeed, mapRange };
