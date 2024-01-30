const { txtToArr } = require("../data/txtToJSON");
const {
  findFiveOfAKind,
  findFourOfAKind,
  findFullHouse,
  createFHRegex,
  findThreeOfAKind,
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
    });
    test("does not detect full houses", () => {
      const hands = [
        { hand: "K22KK", bid: 0 },
        { hand: "KK32K", bid: 0 },
      ];
      const fullHouses = [{ hand: "KK32K", bid: 0 }];
      expect(findFullHouse(hands)).toEqual(fullHouses);
    });
    test("detects other labels", () => {
      const hands = [
        { hand: "A24AA", bid: 0 },
        { hand: "KK33K", bid: 0 },
      ];
      const threeOfAKinds = [{ hand: "A24AA", bid: 0 }];
      expect(findThreeOfAKind(hands)).toEqual(threeOfAKinds);
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
});
