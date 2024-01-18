const { convertF } = require("./part1");

const setNewSeed = (data) => {
  const seed = [];
  for (let i = 0; i < data.seed.length; i += 2) {
    const lower = +data.seed[i];
    const upper = +data.seed[i] + +data.seed[i + 1] - 1;
    seed.push([lower, upper]);
  }

  return { ...data, seed };
};

const mapRange = (range, maps) => {
  const [lowerR, upperR] = range;

  const subRanges = [...maps].sort(function (a, b) {
    return a[1] - b[1];
  });

  const newRanges = [];

  for (let i = 0; i < subRanges.length; i++) {
    const lowerM = +subRanges[i][1];
    const lowerM1 = i < subRanges.length - 1 ? +subRanges[i + 1][1] : upperR;
    const upperM = lowerM + +subRanges[i][2] - 1;

    const conversion = +subRanges[i][0] - +subRanges[i][1];
    //Maps entire range
    if (lowerM < lowerR && upperM > upperR) {
      newRanges.push([lowerR + conversion, upperR + conversion]);
    }
    //maps at the lower range limit
    else if (lowerM < lowerR && upperM <= upperR && upperM >= lowerR) {
      newRanges.push([lowerR + conversion, upperM + conversion]);
      // If not the last map, and the next one isn't consecutive
      if (lowerM1 !== upperR && upperM + 1 !== lowerM1) {
        newRanges.push([upperM + 1, lowerM1 - 1]);
      }
      if (lowerM1 === upperR && upperM !== upperR) {
        newRanges.push([upperM + 1, lowerM1]);
      }
    }

    //maps in the range
    else if (
      lowerM >= lowerR &&
      lowerM <= upperR &&
      upperM <= upperR &&
      upperM >= lowerR
    ) {
      if (lowerM !== lowerR && newRanges.length === 0) {
        newRanges.push([lowerR, lowerM - 1]);
      }
      newRanges.push([lowerM + conversion, upperM + conversion]);

      if (lowerM1 !== upperR && upperM + 1 !== lowerM1) {
        newRanges.push([upperM + 1, lowerM1 - 1]);
      }
      if (lowerM1 === upperR && upperM !== upperR) {
        newRanges.push([upperM + 1, lowerM1]);
      }
    }

    //maps at the upper range limit
    else if (lowerM >= lowerR && lowerM <= upperR && upperM > upperR) {
      if (i === 0 && lowerR !== lowerM) {
        newRanges.push([lowerR, lowerM - 1]);
      }
      newRanges.push([lowerM + conversion, upperR + conversion]);
    }
  }

  // maps not in range
  if (newRanges.length === 0) {
    newRanges.push([lowerR, upperR]);
  }
  return newRanges;
};

const convertRanges = (from, to, data) => {
  const ranges = data[from].map((range) => {
    return mapRange(range, data[`${from}-to-${to}`]);
  });
  return { ...data, [to]: ranges.flat() };
};

const seedToSoilR = convertF("seed", "soil", convertRanges);
const soilToFertR = convertF("soil", "fertilizer", convertRanges);
const fertToWaterR = convertF("fertilizer", "water", convertRanges);
const waterToLightR = convertF("water", "light", convertRanges);
const lightToTempR = convertF("light", "temperature", convertRanges);
const tempToHumidityR = convertF("temperature", "humidity", convertRanges);
const humidityToLocationR = convertF("humidity", "location", convertRanges);

const getLocationR = (data) => {
  const seedR = setNewSeed(data);
  const soilR = seedToSoilR(seedR);
  const fertR = soilToFertR(soilR);
  const waterR = fertToWaterR(fertR);
  const lightR = waterToLightR(waterR);
  const tempR = lightToTempR(lightR);
  const humidityR = tempToHumidityR(tempR);
  const locationR = humidityToLocationR(humidityR);
  return locationR.location;
};

const part2Answer = (data) => {
  const locationR = getLocationR(data);
  const locationMin = locationR.map(([min]) => {
    return min;
  });
  return findMin(locationMin);
};
module.exports = {
  setNewSeed,
  mapRange,
  convertRanges,
  seedToSoilR,
  soilToFertR,
  fertToWaterR,
  waterToLightR,
  lightToTempR,
  tempToHumidityR,
  humidityToLocationR,
  getLocationR,
  part2Answer,
};
