const getArea = (route) => {
  return Math.abs(
    0.5 *
      route.reduce((area, [x1, y1], index) => {
        const [x2, y2] =
          index === route.length - 1 ? route[0] : route[index + 1];
        area += x1 * y2 - x2 * y1;
        return area;
      }, 0)
  );
};

const getBoundaries = (route) => {
  return route.length - 1;
};

const getInteriorPts = (route) => {
  return getArea(route) - 0.5 * getBoundaries(route) + 1;
};

const partTwoAnswer = (pipes) => {
  return getInteriorPts(getRoute(pipes));
};

module.exports = { getArea, getBoundaries, getInteriorPts, partTwoAnswer };
