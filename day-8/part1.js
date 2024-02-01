const countSteps = (data, start = "AAA", end = "ZZZ") => {
  const { path, network } = data;
  const endRegExp = new RegExp(`${end}`, "");

  let counter = 0;
  let currentNode = start;

  while (!endRegExp.test(currentNode)) {
    for (direction of path) {
      counter++;
      currentNode = network[currentNode][direction];
      if (endRegExp.test(currentNode)) {
        break;
      }
    }
  }
  return counter;
};

module.exports = { countSteps };
