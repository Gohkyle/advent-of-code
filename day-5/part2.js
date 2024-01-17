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

  const subRanges = maps.sort(function (a, b) {
    return a[1] - b[1];
  });

  const newRanges = [];

  for (let i = 0; i < subRanges.length; i++) {
    const lowerM = +subRanges[i][1];
    const lowerM1 = i < subRanges.length - 1 ? +subRanges[i + 1][1] : upperR;
    const upperM = lowerM + +subRanges[i][2] - 1;

    const conversion = +subRanges[i][0] - +subRanges[i][1];

    if ((lowerM > upperR || upperM < lowerR) && lowerM1 === upperR) {
      newRanges.push([lowerR, upperR]);
    } else if (lowerM < lowerR && upperM > upperR) {
      newRanges.push([lowerR + conversion, upperR + conversion]);
    } else if (lowerM < lowerR && upperM <= upperR && upperM >= lowerR) {
      newRanges.push([lowerR + conversion, upperM + conversion]);
      if (upperM !== upperR) {
        if (lowerM1 !== upperR) {
          newRanges.push([upperM + 1, lowerM1 - 1]);
        } else newRanges.push([upperM + 1, lowerM1]);
      }
    } else if (
      lowerM >= lowerR &&
      lowerM <= upperR &&
      upperM <= upperR &&
      upperM >= lowerR
    ) {
      if (lowerM !== lowerR && i === 0) {
        newRanges.push([lowerR, lowerM - 1]);
      }
      newRanges.push([lowerM + conversion, upperM + conversion]);
      if (upperM !== upperR && upperM + 1 !== lowerM1) {
        newRanges.push([upperM + 1, lowerM1]);
      }
    } else if (lowerM >= lowerR && lowerM <= upperR && upperM > upperR) {
      if (i === 0) {
        newRanges.push([lowerR, lowerM - 1]);
      }
      newRanges.push([lowerM + conversion, upperR + conversion]);
    }
  }

  return newRanges;
};

const convertRanges = () => {};
module.exports = { setNewSeed, mapRange, convertRanges };
