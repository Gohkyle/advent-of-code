const findMatches = (scratchCards) => {
  return scratchCards.map((line) => {
    return line[0].filter((winNumber) => {
      return line[1].includes(winNumber);
    });
  });
};

const calcPoints = (matchingNumbersArr) => {
  return matchingNumbersArr.map((matchingNumbers) => {
    return matchingNumbers[0] ? 2 ** (matchingNumbers.length - 1) : 0;
  });
};

const sumPoints = (points) => {
  return points.reduce((acc, point) => (acc += point), 0);
};

const part1Answer = (scratchCards) => {
  const matches = findMatches(scratchCards);
  const points = calcPoints(matches);

  return sumPoints(points);
};
module.exports = { findMatches, calcPoints, sumPoints, part1Answer };
