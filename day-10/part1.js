const getS = (pipes) => {
  for (let y = 0; y < pipes.length; y++) {
    for (x = 0; x < pipes[y].length; x++) {
      if (pipes[y][x] === "S") {
        return [y, x];
      }
    }
  }
};

const checkDirection = (pipes, position, direction) => {
  const [y, x] = position;
  const northRegex = new RegExp("[F7\\|]", "g");
  const eastRegex = new RegExp("[J7-]", "g");
  const southRegex = new RegExp("[JL\\|]", "g");
  const westRegex = new RegExp("[LF-]", "g");

  switch (direction) {
    case "N":
      return pipes[y - 1] ? northRegex.test(pipes[y - 1][x]) : false;
    case "E":
      return pipes[y][x + 1] ? eastRegex.test(pipes[y][x + 1]) : false;
    case "S":
      return pipes[y + 1] ? southRegex.test(pipes[y + 1][x]) : false;
    case "W":
      return pipes[y][x - 1] ? westRegex.test(pipes[y][x - 1]) : false;
  }
};

const getDisplacement = (route) => {
  const route2 = route[route.length - 1];
  const route1 = route[route.length - 2];

  const [y2, x2] = route2;
  const [y1, x1] = route1;

  return [y2 - y1, x2 - x1];
};

const getRoute = (pipes) => {
  let s = getS(pipes);

  let route = [[...s]];

  const north = checkDirection(pipes, s, "N");
  const east = checkDirection(pipes, s, "E");
  const south = checkDirection(pipes, s, "S");
  const west = checkDirection(pipes, s, "W");

  const goNorth = () => {
    s[0] += -1;
    route.push([...s]);
  };

  const goEast = () => {
    s[1] += 1;
    route.push([...s]);
  };

  const goSouth = () => {
    s[0] += 1;
    route.push([...s]);
  };

  const goWest = () => {
    s[1] += -1;
    route.push([...s]);
  };

  function getNextStep() {
    const currentPipe = pipes[s[0]][s[1]];
    if (route.length === 1) {
      if (north) {
        goNorth();
      } else if (east) {
        goEast();
      } else if (south) {
        goSouth();
      } else if (west) {
        goWest();
      }
    } else if (currentPipe === "|") {
      getDisplacement(route)[0] > 0 ? goSouth() : goNorth();
    } else if (currentPipe === "-") {
      getDisplacement(route)[1] > 0 ? goEast() : goWest();
    } else if (currentPipe === "L") {
      getDisplacement(route)[1] < 0 ? goNorth() : goEast();
    } else if (currentPipe === "J") {
      getDisplacement(route)[1] > 0 ? goNorth() : goWest();
    } else if (currentPipe === "7") {
      getDisplacement(route)[1] > 0 ? goSouth() : goWest();
    } else if (currentPipe === "F") {
      getDisplacement(route)[1] < 0 ? goSouth() : goEast();
    }
  }

  getNextStep();

  while (pipes[s[0]][s[1]] !== "S") {
    getNextStep();
  }
  return route;
};

const partOneAnswer = (pipes) => {
  return 0.5 * (getRoute(pipes).length - 1);
};

module.exports = {
  getS,
  getRoute,
  checkDirection,
  getDisplacement,
  partOneAnswer,
};
