const mapNumber = (number, maps) => {
  let newNumber = +number;
  maps.forEach((map) => {
    const lowerLimit = +map[1];
    const upperLimit = lowerLimit + +map[2];
    const conversion = +map[0] - +map[1];

    if (number < upperLimit && number >= lowerLimit) {
      newNumber += +conversion;
    }
  });
  return newNumber;
};

const convertF = (from, to) => {
  return function fromTo(data) {
    return convert(from, to, data);
  };
};

const convert = (from, to, data) => {
  const values = data[from].map((value) => {
    return mapNumber(value, data[`${from}-to-${to}`]);
  });
  return { ...data, [to]: values };
};

const findMin = (numArr) => {
  let min = numArr[0];
  for (const number of numArr) {
    if (number < min) {
      min = number;
    }
  }
  return min;
};

const seedToSoil = convertF("seed", "soil");
const soilToFert = convertF("soil", "fertilizer");
const fertToWater = convertF("fertilizer", "water");
const waterToLight = convertF("water", "light");
const lightToTemp = convertF("light", "temperature");
const tempToHumidity = convertF("temperature", "humidity");
const humidityToLocation = convertF("humidity", "location");

const getLocation = (data) => {
  const soil = seedToSoil(data);
  const fertilizer = soilToFert(soil);
  const water = fertToWater(fertilizer);
  const light = waterToLight(water);
  const temperature = lightToTemp(light);
  const humidity = tempToHumidity(temperature);
  const location = humidityToLocation(humidity);
  return location.location;
};

const part1Answer = (data) => {
  return findMin(getLocation(data));
};
module.exports = {
  seedToSoil,
  convert,
  getLocation,
  findMin,
  part1Answer,
  mapNumber,
  convertF,
  seedToSoil,
  soilToFert,
  fertToWater,
  waterToLight,
  lightToTemp,
  tempToHumidity,
  humidityToLocation,
};
