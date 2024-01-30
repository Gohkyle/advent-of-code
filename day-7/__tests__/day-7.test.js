const { txtToArr } = require("../data/txtToJSON");

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
  });
});
