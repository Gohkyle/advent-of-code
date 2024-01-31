//HIGH CARD: 2345J
// -> ONE PAIR
//ONE PAIR: 23JJ5, 2344J
// -> THREE OF A KIND, THREE OF A KIND
//TWO PAIR: 22JJ4, 2244J
// -> FOUR OF A KIND, FULL HOUSE
//THREE OF A KIND: JJJ52, 222J3
// -> FOUR OF A KIND, FOUR OF A KIND
//FULL HOUSE: JJJ22, 222JJ
// -> FIVE OF A KIND, FIVE OF A KIND
//FOUR OF A KIND: JJJJ3, 3333J
// -> FIVE OF A KIND, FIVE OF A KIND
//FIVE OF A KIND: JJJJJ

const {
  findFiveOfAKind,
  findFourOfAKind,
  sortHands,
  findFullHouse,
  findThreeOfAKind,
  findTwoPair,
  findOnePair,
  findHighCard,
  sumWinning,
} = require("./part1");

const newLabels = [
  "J",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "Q",
  "K",
  "A",
];
const removeWildCard = (hands) => {
  return hands.filter(({ hand }) => {
    return !hand.includes("J");
  });
};

const findWildCard = (hands, Js = 0) => {
  return hands.filter(({ hand }) => {
    if (Js === 0) {
      return hand.includes("J");
    } else if (Js === 1) {
      return hand.includes("J") && hand.indexOf("J") === hand.lastIndexOf("J");
    } else if (Js === -1) {
      return hand.includes("J") && hand.indexOf("J") !== hand.lastIndexOf("J");
    }
  });
};

const promoteAndSortHands = (hands) => {
  const fives = findFiveOfAKind(hands);
  const fours = findFourOfAKind(hands);
  const houses = findFullHouse(hands);
  const threes = findThreeOfAKind(hands);
  const twoPairs = findTwoPair(hands);
  const onePairs = findOnePair(hands);
  const highCards = findHighCard(hands);

  const newFives = sortHands(
    [...fives, ...findWildCard(fours), ...findWildCard(houses)],
    newLabels
  );
  const newFours = sortHands(
    [
      ...removeWildCard(fours),
      ...findWildCard(threes),
      ...findWildCard(twoPairs, -1),
    ],
    newLabels
  );
  const newHouses = sortHands(
    [...removeWildCard(houses), ...findWildCard(twoPairs, 1)],
    newLabels
  );
  const newThrees = sortHands(
    [...removeWildCard(threes), ...findWildCard(onePairs)],
    newLabels
  );
  const newTwoPairs = sortHands([...removeWildCard(twoPairs)], newLabels);
  const newOnePairs = sortHands(
    [...removeWildCard(onePairs), ...findWildCard(highCards)],
    newLabels
  );
  const newHighCards = sortHands([...removeWildCard(highCards)], newLabels);
  return [
    ...newHighCards,
    ...newOnePairs,
    ...newTwoPairs,
    ...newThrees,
    ...newHouses,
    ...newFours,
    ...newFives,
  ];
};

const partTwoAnswer = (data) => {
  const sortedHands = promoteAndSortHands(data);
  return sumWinning(sortedHands);
};

module.exports = {
  removeWildCard,
  findWildCard,
  promoteAndSortHands,
  newLabels,
  partTwoAnswer,
};
