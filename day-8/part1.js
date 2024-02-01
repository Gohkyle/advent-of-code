const countSteps = (data) => {
  const { path, network } = data;

  let counter = 0;
  let currentNode = "AAA";

  while (currentNode !== "ZZZ") {
    for (direction of path) {
      counter++;
      currentNode = network[currentNode][direction];
    }
  }
  return counter;
};

module.exports = { countSteps };
