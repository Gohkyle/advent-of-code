const containFive = `A{5}|K{5}|Q{5}|J{5}|T{5}|9{5}|8{5}|7{5}|6{5}|5{5}|4{5}|3{5}|2{5}`;
const notContainFive = `(?!.*(A{5}|K{5}|Q{5}|J{5}|T{5}|9{5}|8{5}|7{5}|6{5}|5{5}|4{5}|3{5}|2{5}))`;
const containFour = `(?=.*((.*A){4}|(.*K){4})|(.*Q){4}|(.*J){4}|(.*T){4}|(.*9){4}|(.*8){4}|(.*7){4}|(.*6){4}|(.*5){4}|(.*4){4}|(.*3){4}|(.*2){4})`;
const notContainFour = `(?!.*((.*A){4}|(.*K){4})|(.*Q){4}|(.*J){4}|(.*T){4}|(.*9){4}|(.*8){4}|(.*7){4}|(.*6){4}|(.*5){4}|(.*4){4}|(.*3){4}|(.*2){4})`;
const containThree = `(?=.*((.*A){3}|(.*K){3}|(.*Q){3}|(.*J){3}|(.*T){3}|(.*9){3}|(.*8){3}|(.*7){3}|(.*6){3}|(.*5){3}|(.*4){3}|(.*3){3}|(.*2){3}))`;
const notContainThree = `(?!.*((.*A){3}|(.*K){3}|(.*Q){3}|(.*J){3}|(.*T){3}|(.*9){3}|(.*8){3}|(.*7){3}|(.*6){3}|(.*5){3}|(.*4){3}|(.*3){3}|(.*2){3}))`;
const containTwo = `(?=.*((.*A){2}|(.*K){2}|(.*Q){2}|(.*J){2}|(.*T){2}|(.*9){2}|(.*8){2}|(.*7){2}|(.*6){2}|(.*5){2}|(.*4){2}|(.*3){2}|(.*2){2}))`;
const notContainTwo = `(?!.*((.*A){2}|(.*K){2}|(.*Q){2}|(.*J){2}|(.*T){2}|(.*9){2}|(.*8){2}|(.*7){2}|(.*6){2}|(.*5){2}|(.*4){2}|(.*3){2}|(.*2){2}))`;
const labels = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];
const containFHRegex = (positive) => {
  let regex = ``;
  labels.forEach((label, index) => {
    regex += `(${createFHRegex(label)})`;
    if (index !== labels.length - 1) {
      regex += `|`;
    }
  });
  return `(?${positive ? `=` : `!`}.*${regex})`;
};

const containTPRegex = (positive) => {
  let regex = ``;
  labels.forEach((label, index) => {
    regex += `(${createTPRegex(label)})`;
    if (index !== labels.length - 1) {
      regex += `|`;
    }
  });
  return `(?${positive ? `=` : `!`}.*${regex})`;
};
const createTPRegex = (l0) => {
  const disposableLabels = [...labels];

  const start = labels.indexOf(l0);
  disposableLabels.splice(start, 1);

  const [l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12] = disposableLabels;
  return `(?=.*((.*${l1}){2}|(.*${l2}){2}|(.*${l3}){2}|(.*${l4}){2}|(.*${l5}){2}|(.*${l6}){2}|(.*${l7}){2}|(.*${l8}){2}|(.*${l9}){2}|(.*${l10}){2}|(.*${l11}){2}|(.*${l12}){2}))(.*${l0}){2}`;
};

const findFiveOfAKind = (hands) => {
  const regex = new RegExp(`${containFive}`, "g");
  return hands.filter(({ hand }) => {
    return regex.test(hand);
  });
};

const findFourOfAKind = (hands) => {
  const regex = new RegExp(
    `^${notContainFive}${containFour}[AKQJT98765432]{5}$`,
    "m"
  );
  return hands.filter(({ hand }) => {
    return regex.test(hand);
  });
};

const findFullHouse = (hands) => {
  const regex = new RegExp(
    `^${containFHRegex(true)}${notContainFour}[AKQJT98765432]{5}$`,
    "m"
  );
  return hands.filter(({ hand }) => {
    return regex.test(hand);
  });
};

const createFHRegex = (l0) => {
  const disposableLabels = [...labels];

  const start = labels.indexOf(l0);
  disposableLabels.splice(start, 1);

  const [l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12] = disposableLabels;
  return `(?=.*((.*${l1}){2}|(.*${l2}){2}|(.*${l3}){2}|(.*${l4}){2}|(.*${l5}){2}|(.*${l6}){2}|(.*${l7}){2}|(.*${l8}){2}|(.*${l9}){2}|(.*${l10}){2}|(.*${l11}){2}|(.*${l12}){2}))(.*${l0}){3}`;
};

const findThreeOfAKind = (hands) => {
  const regex = new RegExp(
    `^${containFHRegex(
      false
    )}${containThree}${notContainFour}[AKQJT98765432]{5}$`
  );
  return hands.filter(({ hand }) => {
    return regex.test(hand);
  });
};

const findTwoPair = (hands) => {
  const regex = new RegExp(
    `^${containTPRegex(true)}${notContainThree}[AKQJT98765432]{5}$`
  );
  return hands.filter(({ hand }) => {
    return regex.test(hand);
  });
};

const findOnePair = (hands) => {
  const regex = new RegExp(
    `^${containTPRegex(
      false
    )}${containTwo}${notContainThree}[AKQJT98765432]{5}$`
  );
  return hands.filter(({ hand }) => {
    return regex.test(hand);
  });
};

const findHighCard = (hands) => {
  const regex = new RegExp(
    `^${containTPRegex(false)}${notContainTwo}[AKQJT98765432]{5}$`
  );
  return hands.filter(({ hand }) => {
    return regex.test(hand);
  });
};

const sortHands = (hands, rankings = labels) => {
  const compareFn = (a, b) => {
    for (let i = 0; i < 5; i++) {
      const sortingValue =
        rankings.indexOf(a.hand[i]) - rankings.indexOf(b.hand[i]);

      if (sortingValue !== 0) {
        return sortingValue;
      }
    }
  };
  return hands.sort(compareFn);
};

const sumWinning = (hands) => {
  return hands.reduce((winnings, { bid }, index) => {
    winnings += bid * (index + 1);
    return winnings;
  }, 0);
};

const partOneAnswer = (hands) => {
  const fives = sortHands(findFiveOfAKind(hands));
  const fours = sortHands(findFourOfAKind(hands));
  const houses = sortHands(findFullHouse(hands));
  const threes = sortHands(findThreeOfAKind(hands));
  const twoPairs = sortHands(findTwoPair(hands));
  const pairs = sortHands(findOnePair(hands));
  const highCards = sortHands(findHighCard(hands));

  const sortedHands = [
    ...highCards,
    ...pairs,
    ...twoPairs,
    ...threes,
    ...houses,
    ...fours,
    ...fives,
  ];

  return sumWinning(sortedHands);
};

module.exports = {
  findFiveOfAKind,
  findFourOfAKind,
  findFullHouse,
  createFHRegex,
  findThreeOfAKind,
  findTwoPair,
  findOnePair,
  findHighCard,
  sortHands,
  sumWinning,
  partOneAnswer,
};
