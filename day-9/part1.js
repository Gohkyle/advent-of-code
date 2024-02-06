const findStepDiff = (sequence) => {
  return sequence.reduce((acc, term, index) => {
    if (index < sequence.length - 1) {
      acc.push(sequence[index + 1] - term);
    }
    return acc;
  }, []);
};

const findNextTerm = (sequence) => {
  const stepDiff = findStepDiff(sequence);
  const lastTerm = sequence[sequence.length - 1];

  if (lastTerm !== 0) {
    return lastTerm + findNextTerm(stepDiff);
  } else return lastTerm;
};

const partOneAnswer = (data) => {
  return data.reduce((acc, sequence) => {
    return acc + laGrangeInterpolation(sequence);
  }, 0);
};

const laGrangeInterpolation = (sequence, n = sequence.length) => {
  return sequence.reduce((sum, y, x) => {
    let numerator = y;
    let denominator = 1;
    let xn = n;

    for (let xi = 0; xi < sequence.length; xi++) {
      if (xi !== x) {
        numerator *= xn - xi;
        denominator *= x - xi;
      }
    }
    return sum + numerator / denominator;
  }, 0);
};

module.exports = {
  findStepDiff,
  findNextTerm,
  partOneAnswer,
  laGrangeInterpolation,
};
