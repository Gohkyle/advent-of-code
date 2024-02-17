const { getRoute } = require("./part1");

const pickTheorem = () => {
  // i = A - b/2 + 1
};
const getArea = (arr) => {
  return Math.abs(
    0.5 *
      arr.reduce((area, [x1, y1], index) => {
        const [x2, y2] = index === arr.length - 1 ? arr[0] : arr[index + 1];
        area += x1 * y2 - x2 * y1;
        return area;
      }, 0)
  );
};

const getInteriorPts = (route) => {
  return route.length - 1;
};

module.exports = { getArea, getInteriorPts };
