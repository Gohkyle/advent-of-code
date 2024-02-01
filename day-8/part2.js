const { countSteps } = require("./part1");

const findStartNodes = ({ network }) => {
  const nodes = Object.keys(network);

  const startNodesRegex = new RegExp(`..A`, "g");
  const startNodes = nodes.filter((node) => {
    return startNodesRegex.test(node);
  });

  return startNodes.map((node) => {
    return { node, steps: 0 };
  });
};

const findNextZ = (data, startNodes) => {
  return startNodes.map(({ node, steps }) => {
    return { node, steps: (steps += countSteps(data, node, "..Z")) };
  });
};

const gcd = (a, b) => (!b ? a : gcd(b, a % b));
const lcm = (x, y) => (x * y) / gcd(x, y);

const lcmMultiple = (...arr) => [...arr].reduce((a, b) => lcm(a, b));

const partTwoAnswer = (data) => {
  const startNodes = findStartNodes(data);
  const ghosts = findNextZ(data, startNodes);
  const numbers = ghosts.map((ghost) => {
    return ghost.steps;
  });
  return lcmMultiple(...numbers);
};

module.exports = { findStartNodes, findNextZ, partTwoAnswer };
