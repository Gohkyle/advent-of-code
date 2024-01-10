const seedToSoil = (data) => {
  return convert("seed", "soil", data);
};

const convert = (from, to, data) => {
  const values = data[from].map((value) => {
    let newNumber = 0;

    data[`${from}-to-${to}`].forEach((line) => {
      const lowerLimit = +line[1];
      const upperLimit = lowerLimit + +line[2] - 1;
      const conversion = +line[0] - +line[1];

      if (value <= upperLimit && value >= lowerLimit) {
        newNumber = +value + +conversion;
      } else newNumber = +value;
    });
    return newNumber;
  });
  return { ...data, [to]: values };
};
module.exports = { seedToSoil, convert };
