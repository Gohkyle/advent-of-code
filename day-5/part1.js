const seedToSoil = (data) => {
  return convert("seed", "soil", data);
};

const convert = (from, to, data) => {
  const values = data[from].map((value) => {
    let newNumber = +value;

    data[`${from}-to-${to}`].forEach((line) => {
      const lowerLimit = +line[1];
      const upperLimit = lowerLimit + +line[2];
      const conversion = +line[0] - +line[1];

      if (value < upperLimit && value >= lowerLimit) {
        newNumber += +conversion;
      }
    });
    return newNumber;
  });
  return { ...data, [to]: values };
};

const part1Answer = (data) => {
  const soil = convert("seed", "soil", data);
  const fertilizer = convert("soil", "fertilizer", soil);
  const water = convert("fertilizer", "water", fertilizer);
  const light = convert("water", "light", water);
  const temperature = convert("light", "temperature", light);
  const humidity = convert("temperature", "humidity", temperature);
  const location = convert("humidity", "location", humidity);
  return location.location;
};
module.exports = { seedToSoil, convert, part1Answer };
