const { findMatches, sumPoints } = require("./part1");

//create an array that tracks the numbers of scratchcards
const scratchCardTracker = (scratchCards) => {
  const tracker = Array(scratchCards.length).fill(1);

  scratchCards.map((scratchCard, currCardNo) => {
    return scratchCard.map((_, index) => {
      const cardNo = currCardNo + 1 + index;
      if (cardNo < scratchCards.length) {
        tracker[cardNo] += tracker[currCardNo];
      }
    });
  });

  return tracker;
};

const part2Answer = (scratchCards) => {
  const matches = findMatches(scratchCards);
  const tracker = scratchCardTracker(matches);

  return sumPoints(tracker);
};

module.exports = { scratchCardTracker, part2Answer };
