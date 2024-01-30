const containsFive = `A{5}|K{5}|Q{5}|J{5}|T{5}|9{5}|8{5}|7{5}|6{5}|5{5}|4{5}|3{5}|2{5}`;

const findHandType = () => {};

const findFiveOfAKind = (hands) => {
  const regex = new RegExp(`${containsFive}`, "g");
  return hands.filter(({ hand }) => {
    return regex.test(hand);
  });
};

const findFourOfAKind = (hands) => {
  const regex = new RegExp(
    `^(?!.*(A{5}|K{5}|Q{5}|J{5}|T{5}|9{5}|8{5}|7{5}|6{5}|5{5}|4{5}|3{5}|2{5}))
    (?=.*((.*A){4}|(.*K){4})|(.*Q){4}|(.*J){4}|(.*T){4}|(.*9){4}|(.*8){4}|(.*7){4}|(.*6){4}|(.*5){4}|(.*4){4}|(.*3){4}|(.*2){4})
    [AKQJT98765432]{5}$`,
    "m"
  );
  return hands.filter(({ hand }) => {
    return regex.test(hand);
  });
};

const findFullHouse = () => {
  const regex = new RegExp(
    `
    ^(?=.*((.*A){2}|(.*K){2})|(.*Q){2}|(.*J){2}|(.*T){2}|(.*9){2}|(.*8){2}|(.*7){2}|(.*6){2}|(.*5){2}|(.*4){2}|(.*3){2}|(.*2){2})
    (?=.*((.*A){3}|(.*K){3})|(.*Q){3}|(.*J){3}|(.*T){3}|(.*9){3}|(.*8){3}|(.*7){3}|(.*6){3}|(.*5){3}|(.*4){3}|(.*3){3}|(.*2){3})
    [AKQJT98765432]{5}$
    `,
    "m"
  );
};
module.exports = { findFiveOfAKind, findFourOfAKind, findFullHouse };

const findThreeOfAKind = () => {};
