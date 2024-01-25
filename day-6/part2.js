const calcWins2 = (time, distance) => {
  //distance = x(time-x)
  //x^2-time*x +distance = 0
  let x1 = Math.ceil((time - Math.sqrt(time ** 2 - 4 * distance)) / 2);
  let x2 = Math.floor((time + Math.sqrt(time ** 2 - 4 * distance)) / 2);

  return x2 - x1 + 1;
};

const part2Answer = ({ time, distance }) => {
  return calcWins2(time, distance);
};
module.exports = { calcWins2, part2Answer };
