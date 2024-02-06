const getSequences = (txt) => {
  const sequenceStrings = txt.split("\n");
  const sequenceArr = sequenceStrings.map((string) => {
    return string.match(/-*\d+/g).map((number) => +number);
  });
  return sequenceArr;
};

module.exports = { getSequences };
