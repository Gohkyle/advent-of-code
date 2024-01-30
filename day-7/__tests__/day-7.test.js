const { txtToArr } = require("../data/txtToJSON");
const {
  findFiveOfAKind,
  findFourOfAKind,
  findFullHouse,
  createFHRegex,
  findThreeOfAKind,
  findTwoPair,
  findOnePair,
  findHighCard,
} = require("../part1");

describe("txtToJSON", () => {
  describe("txtToArr()", () => {
    test("returns the single line txt as an array with one object with properties hand and bid", () => {
      const txt = `AK233 95`;
      const array = [{ hand: "AK233", bid: 95 }];

      expect(txtToArr(txt)).toEqual(array);
    });
    test("bid is a number", () => {
      const txt = `AK233 95`;

      txtToArr(txt).forEach((handAndBid) => {
        expect(typeof handAndBid.bid).toEqual("number");
      });
    });
    test("accepts multiline txt", () => {
      const txt = `32T3K 765
        T55J5 684
        KK677 28
        KTJJT 220
        QQQJA 483`;
      const array = [
        { hand: "32T3K", bid: 765 },
        { hand: "T55J5", bid: 684 },
        { hand: "KK677", bid: 28 },
        { hand: "KTJJT", bid: 220 },
        { hand: "QQQJA", bid: 483 },
      ];

      expect(txtToArr(txt)).toEqual(array);
    });
    test("original text is not mutated", () => {
      const txt = `32T3K 765
            T55J5 684
            KK677 28
            KTJJT 220
            QQQJA 483`;
      const copyTxt = `32T3K 765
            T55J5 684
            KK677 28
            KTJJT 220
            QQQJA 483`;
      txtToArr(txt);
      expect(txt).toEqual(copyTxt);
    });
  });
});
describe("part1", () => {
  describe("findFiveOfAKind()", () => {
    test("takes an array of hands and returns all the five of a kind hands", () => {
      const hands = [
        { hand: "QQQQQ", bid: 0 },
        { hand: "QQQ1Q", bid: 0 },
      ];
      const fiveOfAKinds = [{ hand: "QQQQQ", bid: 0 }];

      expect(findFiveOfAKind(hands)).toEqual(fiveOfAKinds);
    });
    test("returns a new array", () => {
      const hands = [
        { hand: "QQQQQ", bid: 0 },
        { hand: "QQQ1Q", bid: 0 },
      ];

      expect(findFiveOfAKind(hands)).not.toEqual(hands);
    });
    test("original array is not mutated", () => {
      const hands = [
        { hand: "QQQQQ", bid: 0 },
        { hand: "QQQ1Q", bid: 0 },
      ];
      const copyHands = [
        { hand: "QQQQQ", bid: 0 },
        { hand: "QQQ1Q", bid: 0 },
      ];

      findFiveOfAKind(hands);
      expect(hands).toEqual(copyHands);
    });
  });
  describe("findFourOfAKind()", () => {
    describe("takes an array of hands and returns all the four of a kind hands", () => {
      test("detects 4 in a row", () => {
        const hands = [
          { hand: "KKKK2", bid: 0 },
          { hand: "K2345", bid: 0 },
        ];
        const fourOfAKinds = [{ hand: "KKKK2", bid: 0 }];
        expect(findFourOfAKind(hands)).toEqual(fourOfAKinds);
      });
      test("detects non consecutive cards in a hand", () => {
        const hands = [
          { hand: "KKKK2", bid: 0 },
          { hand: "K234A", bid: 0 },
          { hand: "KK2KK", bid: 0 },
          { hand: "2KKKK", bid: 0 },
          { hand: "K2KKK", bid: 0 },
          { hand: "KKK2K", bid: 0 },
          { hand: "KKK23", bid: 0 },
          { hand: "KK234", bid: 0 },
        ];
        const fourOfAKinds = [
          { hand: "KKKK2", bid: 0 },
          { hand: "KK2KK", bid: 0 },
          { hand: "2KKKK", bid: 0 },
          { hand: "K2KKK", bid: 0 },
          { hand: "KKK2K", bid: 0 },
        ];

        expect(findFourOfAKind(hands)).toEqual(fourOfAKinds);
      });
      test("does not detect five of a kind", () => {
        const hands = [{ hand: "QQQQQ", bid: 0 }];
        const fourOfAKinds = [];

        expect(findFourOfAKind(hands)).toEqual(fourOfAKinds);
      });
    });
    test("returns a new array", () => {
      const hands = [
        { hand: "QQQQQ", bid: 0 },
        { hand: "QQQ1Q", bid: 0 },
      ];

      expect(findFourOfAKind(hands)).not.toEqual(hands);
    });
    test("original array is not mutated", () => {
      const hands = [
        { hand: "QQQQQ", bid: 0 },
        { hand: "QQQ1Q", bid: 0 },
      ];
      const copyHands = [
        { hand: "QQQQQ", bid: 0 },
        { hand: "QQQ1Q", bid: 0 },
      ];

      findFourOfAKind(hands);
      expect(hands).toEqual(copyHands);
    });
  });
  describe("findFullHouse()", () => {
    describe("takes an array of hands and returns all the full house hands", () => {
      test("detects 3 in a row, and 2 in a row", () => {
        const hands = [
          { hand: "KKK22", bid: 0 },
          { hand: "22KKK", bid: 0 },
          { hand: "2345K", bid: 0 },
        ];
        const fullHouses = [
          { hand: "KKK22", bid: 0 },
          { hand: "22KKK", bid: 0 },
        ];
        expect(findFullHouse(hands)).toEqual(fullHouses);
      });
      test("detects non consecutive cards in a hand", () => {
        const hands = [
          { hand: "K22KK", bid: 0 },
          { hand: "KK22K", bid: 0 },
          { hand: "K2K2K", bid: 0 },
          { hand: "KK2K2", bid: 0 },
          { hand: "K2KK2", bid: 0 },
          { hand: "2K2KK", bid: 0 },
          { hand: "2KK2K", bid: 0 },
          { hand: "2KKK2", bid: 0 },
          { hand: "K2345", bid: 0 },
        ];
        const fourOfAKinds = [
          { hand: "K22KK", bid: 0 },
          { hand: "KK22K", bid: 0 },
          { hand: "K2K2K", bid: 0 },
          { hand: "KK2K2", bid: 0 },
          { hand: "K2KK2", bid: 0 },
          { hand: "2K2KK", bid: 0 },
          { hand: "2KK2K", bid: 0 },
          { hand: "2KKK2", bid: 0 },
        ];
        expect(findFullHouse(hands)).toEqual(fourOfAKinds);
      });
      test("does not detect five of a kind", () => {
        const hands = [{ hand: "QQQQQ", bid: 0 }];
        const fourOfAKinds = [];

        expect(findFullHouse(hands)).toEqual(fourOfAKinds);
      });
      test("does not detect four of a kind", () => {
        const hands = [{ hand: "QQQQ2", bid: 0 }];
        const fourOfAKinds = [];

        expect(findFullHouse(hands)).toEqual(fourOfAKinds);
      });
    });
    test("does not detect three of a kind", () => {
      const hands = [
        { hand: "K22KK", bid: 0 },
        { hand: "KK32K", bid: 0 },
      ];
      const fullHouses = [{ hand: "K22KK", bid: 0 }];
      expect(findFullHouse(hands)).toEqual(fullHouses);
    });
    test("detects other labels", () => {
      const hands = [
        { hand: "A22AA", bid: 0 },
        { hand: "KK32K", bid: 0 },
      ];
      const fullHouses = [{ hand: "A22AA", bid: 0 }];
      expect(findFullHouse(hands)).toEqual(fullHouses);
    });
    test("returns a new array", () => {
      const hands = [
        { hand: "QQQQQ", bid: 0 },
        { hand: "QQQ2Q", bid: 0 },
      ];

      expect(findFullHouse(hands)).not.toEqual(hands);
    });
    test("original array is not mutated", () => {
      const hands = [
        { hand: "QQQQQ", bid: 0 },
        { hand: "QQQ2Q", bid: 0 },
      ];
      const copyHands = [
        { hand: "QQQQQ", bid: 0 },
        { hand: "QQQ2Q", bid: 0 },
      ];

      findFullHouse(hands);
      expect(hands).toEqual(copyHands);
    });
  });
  describe("createFullHouseRegex()", () => {
    test("takes a card label, returns the regex capture group that returns any full house associated with three of tha given label", () => {
      const KKKXX = `(?=.*((.*A){2}|(.*Q){2}|(.*J){2}|(.*T){2}|(.*9){2}|(.*8){2}|(.*7){2}|(.*6){2}|(.*5){2}|(.*4){2}|(.*3){2}|(.*2){2}))(.*K){3}`;
      const TTTXX = `(?=.*((.*A){2}|(.*K){2}|(.*Q){2}|(.*J){2}|(.*9){2}|(.*8){2}|(.*7){2}|(.*6){2}|(.*5){2}|(.*4){2}|(.*3){2}|(.*2){2}))(.*T){3}`;

      expect(createFHRegex("K")).toBe(KKKXX);
      expect(createFHRegex("T")).toBe(TTTXX);
    });
  });
  describe("findThreeOfAKind()", () => {
    describe("takes an array of hands and returns all the three of a kinds", () => {
      test("detects 3 in a row", () => {
        const hands = [
          { hand: "KKK42", bid: 0 },
          { hand: "42KKK", bid: 0 },
          { hand: "2345K", bid: 0 },
        ];
        const threeOfAKinds = [
          { hand: "KKK42", bid: 0 },
          { hand: "42KKK", bid: 0 },
        ];
        expect(findThreeOfAKind(hands)).toEqual(threeOfAKinds);
      });
      test("detects non consecutive cards in a hand", () => {
        const hands = [
          { hand: "K24KK", bid: 0 },
          { hand: "KK24K", bid: 0 },
          { hand: "K2K4K", bid: 0 },
          { hand: "KK2K4", bid: 0 },
          { hand: "K2KK4", bid: 0 },
          { hand: "2K4KK", bid: 0 },
          { hand: "2KK4K", bid: 0 },
          { hand: "2KKK4", bid: 0 },
          { hand: "K2345", bid: 0 },
        ];
        const threeOfAKinds = [
          { hand: "K24KK", bid: 0 },
          { hand: "KK24K", bid: 0 },
          { hand: "K2K4K", bid: 0 },
          { hand: "KK2K4", bid: 0 },
          { hand: "K2KK4", bid: 0 },
          { hand: "2K4KK", bid: 0 },
          { hand: "2KK4K", bid: 0 },
          { hand: "2KKK4", bid: 0 },
        ];
        expect(findThreeOfAKind(hands)).toEqual(threeOfAKinds);
      });
      test("does not detect five of a kind", () => {
        const hands = [{ hand: "QQQQQ", bid: 0 }];
        const threeOfAKinds = [];

        expect(findThreeOfAKind(hands)).toEqual(threeOfAKinds);
      });
      test("does not detect four of a kind", () => {
        const hands = [{ hand: "QQQQ2", bid: 0 }];
        const threeOfAKinds = [];

        expect(findThreeOfAKind(hands)).toEqual(threeOfAKinds);
      });
      test("does not detect full houses", () => {
        const hands = [
          { hand: "K22KK", bid: 0 },
          { hand: "KK32K", bid: 0 },
        ];
        const threeOfAKinds = [{ hand: "KK32K", bid: 0 }];
        expect(findThreeOfAKind(hands)).toEqual(threeOfAKinds);
      });
      test("detects other labels", () => {
        const hands = [
          { hand: "A24AA", bid: 0 },
          { hand: "KK33K", bid: 0 },
        ];
        const threeOfAKinds = [{ hand: "A24AA", bid: 0 }];
        expect(findThreeOfAKind(hands)).toEqual(threeOfAKinds);
      });
    });
    test("returns a new array", () => {
      const hands = [
        { hand: "QQQ23", bid: 0 },
        { hand: "QQQ2Q", bid: 0 },
      ];

      expect(findThreeOfAKind(hands)).not.toEqual(hands);
    });
    test("original array is not mutated", () => {
      const hands = [
        { hand: "QQQ23", bid: 0 },
        { hand: "QQQ2Q", bid: 0 },
      ];
      const copyHands = [
        { hand: "QQQ23", bid: 0 },
        { hand: "QQQ2Q", bid: 0 },
      ];

      findThreeOfAKind(hands);
      expect(hands).toEqual(copyHands);
    });
  });
  describe("findTwoPairs()", () => {
    describe("takes an array of hands and returns all the two pairs", () => {
      test("detects 2 in a row", () => {
        const hands = [
          { hand: "KKAA2", bid: 0 },
          { hand: "AA5KK", bid: 0 },
          { hand: "2345K", bid: 0 },
        ];
        const twoPairs = [
          { hand: "KKAA2", bid: 0 },
          { hand: "AA5KK", bid: 0 },
        ];
        expect(findTwoPair(hands)).toEqual(twoPairs);
      });
      test("detects non consecutive cards in a hand", () => {
        const hands = [
          { hand: "KA5AK", bid: 0 },
          { hand: "K5AAK", bid: 0 },
          { hand: "KAA5K", bid: 0 },
          { hand: "KA5KA", bid: 0 },
          { hand: "KAAK5", bid: 0 },
          { hand: "K5AKA", bid: 0 },
          { hand: "KAKA5", bid: 0 },
          { hand: "KAK5A", bid: 0 },
          { hand: "K5KAA", bid: 0 },
          { hand: "KK5AA", bid: 0 },
          { hand: "KKA5A", bid: 0 },
          { hand: "KKK5A", bid: 0 },
        ];
        const twoPairs = [
          { hand: "KA5AK", bid: 0 },
          { hand: "K5AAK", bid: 0 },
          { hand: "KAA5K", bid: 0 },
          { hand: "KA5KA", bid: 0 },
          { hand: "KAAK5", bid: 0 },
          { hand: "K5AKA", bid: 0 },
          { hand: "KAKA5", bid: 0 },
          { hand: "KAK5A", bid: 0 },
          { hand: "K5KAA", bid: 0 },
          { hand: "KK5AA", bid: 0 },
          { hand: "KKA5A", bid: 0 },
        ];
        expect(findTwoPair(hands)).toEqual(twoPairs);
      });
      test("does not detect five of a kind", () => {
        const hands = [{ hand: "QQQQQ", bid: 0 }];
        const twoPairs = [];

        expect(findTwoPair(hands)).toEqual(twoPairs);
      });
      test("does not detect four of a kind", () => {
        const hands = [{ hand: "QQQQ2", bid: 0 }];
        const twoPairs = [];

        expect(findTwoPair(hands)).toEqual(twoPairs);
      });
      test("does not detect full houses", () => {
        const hands = [{ hand: "QQQ22", bid: 0 }];
        const twoPairs = [];

        expect(findTwoPair(hands)).toEqual(twoPairs);
      });
      test("does not detect one pair", () => {
        const hands = [{ hand: "Q4522", bid: 0 }];
        const twoPairs = [];

        expect(findTwoPair(hands)).toEqual(twoPairs);
      });
      test("detects other labels", () => {
        const hands = [
          { hand: "A2233", bid: 0 },
          { hand: "JJ33K", bid: 0 },
        ];
        const twoPairs = [
          { hand: "A2233", bid: 0 },
          { hand: "JJ33K", bid: 0 },
        ];
        expect(findTwoPair(hands)).toEqual(twoPairs);
      });
    });
    test("returns a new array", () => {
      const hands = [
        { hand: "QQ223", bid: 0 },
        { hand: "QQQ2Q", bid: 0 },
      ];

      expect(findTwoPair(hands)).not.toEqual(hands);
    });
    test("original array is not mutated", () => {
      const hands = [
        { hand: "QQ223", bid: 0 },
        { hand: "QQQ2Q", bid: 0 },
      ];
      const copyHands = [
        { hand: "QQ223", bid: 0 },
        { hand: "QQQ2Q", bid: 0 },
      ];

      findTwoPair(hands);
      expect(hands).toEqual(copyHands);
    });
  });
  describe("findOnePair()", () => {
    describe("takes an array of hands and returns all the two pairs", () => {
      test("detects 2 in a row", () => {
        const hands = [
          { hand: "KKA32", bid: 0 },
          { hand: "A25KK", bid: 0 },
          { hand: "23345", bid: 0 },
          { hand: "23145", bid: 0 },
        ];
        const onePairs = [
          { hand: "KKA32", bid: 0 },
          { hand: "A25KK", bid: 0 },
          { hand: "23345", bid: 0 },
        ];
        expect(findOnePair(hands)).toEqual(onePairs);
      });
      test("detects non consecutive cards in a hand", () => {
        const hands = [
          { hand: "KA5AK", bid: 0 },
          { hand: "K5AAK", bid: 0 },
          { hand: "KAA5K", bid: 0 },
          { hand: "KA5KA", bid: 0 },
          { hand: "K245K", bid: 0 },
          { hand: "5K24K", bid: 0 },
          { hand: "K2K45", bid: 0 },
          { hand: "45K2K", bid: 0 },
          { hand: "5K2K4", bid: 0 },
          { hand: "KAAK5", bid: 0 },
          { hand: "K5AKA", bid: 0 },
          { hand: "KAKA5", bid: 0 },
        ];
        const onePairs = [
          { hand: "K245K", bid: 0 },
          { hand: "5K24K", bid: 0 },
          { hand: "K2K45", bid: 0 },
          { hand: "45K2K", bid: 0 },
          { hand: "5K2K4", bid: 0 },
        ];
        expect(findOnePair(hands)).toEqual(onePairs);
      });
      test("does not detect five of a kind", () => {
        const hands = [{ hand: "QQQQQ", bid: 0 }];
        const onePairs = [];

        expect(findOnePair(hands)).toEqual(onePairs);
      });
      test("does not detect four of a kind", () => {
        const hands = [{ hand: "QQQQ2", bid: 0 }];
        const onePairs = [];

        expect(findOnePair(hands)).toEqual(onePairs);
      });
      test("does not detect full houses", () => {
        const hands = [{ hand: "QQQ22", bid: 0 }];
        const onePairs = [];

        expect(findOnePair(hands)).toEqual(onePairs);
      });
      test("does not detect two pair", () => {
        const hands = [{ hand: "QQ522", bid: 0 }];
        const onePairs = [];

        expect(findOnePair(hands)).toEqual(onePairs);
      });
      test("detects other labels", () => {
        const hands = [
          { hand: "A4233", bid: 0 },
          { hand: "JJ37K", bid: 0 },
        ];
        const onePairs = [
          { hand: "A4233", bid: 0 },
          { hand: "JJ37K", bid: 0 },
        ];
        expect(findOnePair(hands)).toEqual(onePairs);
      });
    });
    test("returns a new array", () => {
      const hands = [
        { hand: "99223", bid: 0 },
        { hand: "QQQ2Q", bid: 0 },
      ];

      expect(findOnePair(hands)).not.toEqual(hands);
    });
    test("original array is not mutated", () => {
      const hands = [
        { hand: "Q9223", bid: 0 },
        { hand: "QQQ2Q", bid: 0 },
      ];
      const copyHands = [
        { hand: "Q9223", bid: 0 },
        { hand: "QQQ2Q", bid: 0 },
      ];

      findOnePair(hands);
      expect(hands).toEqual(copyHands);
    });
  });
  describe("findHighCard()", () => {
    describe("takes an array of hands and returns only high card hands", () => {
      test("returns high cards only", () => {
        const hands = [
          { hand: "23456", bid: 0 },
          { hand: "22345", bid: 0 },
        ];
        const highCards = [{ hand: "23456", bid: 0 }];
        expect(findHighCard(hands)).toEqual(highCards);
      });
      test("does not detect five of a kind", () => {
        const hands = [
          { hand: "23456", bid: 0 },
          { hand: "22222", bid: 0 },
        ];
        const highCards = [{ hand: "23456", bid: 0 }];
        expect(findHighCard(hands)).toEqual(highCards);
      });
      test("does not detect four of a kind", () => {
        const hands = [
          { hand: "23456", bid: 0 },
          { hand: "222Q2", bid: 0 },
        ];
        const highCards = [{ hand: "23456", bid: 0 }];
        expect(findHighCard(hands)).toEqual(highCards);
      });
      test("does not detect three of a kind/full houses", () => {
        const hands = [
          { hand: "23456", bid: 0 },
          { hand: "223Q2", bid: 0 },
          { hand: "22332", bid: 0 },
        ];
        const highCards = [{ hand: "23456", bid: 0 }];
        expect(findHighCard(hands)).toEqual(highCards);
      });
      test("does not detect two pair or one pair", () => {
        const hands = [
          { hand: "23456", bid: 0 },
          { hand: "223Q2", bid: 0 },
          { hand: "22332", bid: 0 },
        ];
        const highCards = [{ hand: "23456", bid: 0 }];
        expect(findHighCard(hands)).toEqual(highCards);
      });
    });
    test("returns a new array", () => {
      const hands = [
        { hand: "23456", bid: 0 },
        { hand: "223Q2", bid: 0 },
        { hand: "22332", bid: 0 },
      ];
      expect(findHighCard(hands)).not.toEqual(highCards);
    });
    test("original array is not mutated", () => {
      const hands = [
        { hand: "23456", bid: 0 },
        { hand: "223Q2", bid: 0 },
        { hand: "22332", bid: 0 },
      ];
      const copyHands = [
        { hand: "23456", bid: 0 },
        { hand: "223Q2", bid: 0 },
        { hand: "22332", bid: 0 },
      ];
      findHighCard(hands);
      expect(hands).toEqual(copyHands);
    });
  });
});
