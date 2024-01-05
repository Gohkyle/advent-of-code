const findParts = (arr) => {
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

const checkParts = () => {};

module.exports = { findParts };
//scan all numbers, create total

//scan row, for a number,
//check length of number, and position
//create searchbox item which is length of number plus 2, and position is one less than the current
//check current row search or symbols
//check previous row with the search box for symbols
//check next row at with the search box for symbols

//symbol detected move on if not detected store number
