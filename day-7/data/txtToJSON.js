const txtToArr = (txt) => {
  const handRegex = new RegExp("[AKQJT98765432]{5}", "g");
  const bidRegex = new RegExp("(?<=[AKQJT98765432]{5} )\\d+", "g");

  const hands = txt.match(handRegex);
  const bids = txt.match(bidRegex);

  return hands.map((hand, index) => {
    const bid = +bids[index];
    return { hand, bid };
  });
};

module.exports = { txtToArr };
