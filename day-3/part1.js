const findNonParts = (arr) => {
  const numbers = /(?<=\.)\d+(?=\.)|^\d+(?=\.)|(?<=\.)\d+$/g;
  return arr.map((row) => {
    let array;

    const results = [];
    while ((array = numbers.exec(row)) !== null) {
      results.push(array);
    }
    return results;
  });
};

const checkNonParts = (arr) => {
  const remainingParts = findNonParts(arr);

  return remainingParts.map((row, rowNum) => {
    return row.filter((result) => {
      const isSymbol = /[^\.\d]/;

      const nextRow = rowNum + 1;
      const prevRow = rowNum - 1;

      const startSearch = result.index - 1 < 0 ? 0 : result.index - 1;
      const endSearch = startSearch + result[0].length + 2;

      const below = arr[nextRow]
        ? arr[nextRow].slice(startSearch, endSearch)
        : "";

      const above = arr[prevRow]
        ? arr[prevRow].slice(startSearch, endSearch)
        : "";

      return !isSymbol.test(below) && !isSymbol.test(above);
    });
  });
};

module.exports = { findNonParts, checkNonParts };

//scan row, for a number,
//check length of number, and position
//create searchbox item which is length of number plus 2, and position is one less than the current
//check current row search or symbols
//check previous row with the search box for symbols
//check next row at with the search box for symbols

//symbol detected move on if not detected store number

//scan all numbers, create total
