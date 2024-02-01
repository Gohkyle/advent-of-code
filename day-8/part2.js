const findStartNodes = ({ network }) => {
  const nodes = Object.keys(network);

  const startNodesRegex = new RegExp(`..A`, "g");
  return nodes.filter((node) => {
    return startNodesRegex.test(node);
  });
};

module.exports = { findStartNodes };
