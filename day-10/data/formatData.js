const getPipes = (txt) => {
  return txt.split("\n").map((line) => {
    return line.split("");
  });
};

module.exports = { getPipes };
