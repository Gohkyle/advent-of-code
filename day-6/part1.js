const calcWins = (time, distance) => {
  let wins = 0;
  for (let x = 0; x <= time; x++) {
    const travelled = x * (time - x);
    if (travelled > distance) {
      wins++;
    }
  }
  return wins;
};

const part1Answer = (data) => {
  return data.reduce((acc, { time, distance }) => {
    return (acc *= calcWins(time, distance));
  }, 1);
};
module.exports = { calcWins, part1Answer };
