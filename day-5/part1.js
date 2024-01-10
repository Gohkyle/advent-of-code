const seedToSoil = (data) => {
  const { seeds, "seed-to-soil": seedToSoil } = data;

  const soil = seeds.map((seed) => {
    let soilFromSeed = 0;

    seedToSoil.forEach((line) => {
      const lowerLimit = +line[1];
      const upperLimit = lowerLimit + +line[2] - 1;
      const conversion = +line[0] - +line[1];

      if (seed <= upperLimit && seed >= lowerLimit) {
        soilFromSeed = +seed + +conversion;
      } else soilFromSeed = +seed;
    });
    return soilFromSeed;
  });
  return { ...data, soil };
};

module.exports = { seedToSoil };
