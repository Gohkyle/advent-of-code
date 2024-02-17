const { getRoute } = require("./part1");

const pickTheorem = () => {
  // h = A - i - b/2 + 1
};
const getArea = (arr) => {
  return arr.length * arr[0].length;
};

const getBoundaries = (pipes) => {
  const containerBoundary = 2 * (pipes.length + pipes[0].length) - 4;
  const holeBoundary = getRoute(pipes).length - 1;
  return containerBoundary + holeBoundary;
};

module.exports = { getArea, getBoundaries };
