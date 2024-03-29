const findNumbers = (arr) => {
  const isNumbers = /\d+/g;
  return arr.map((row) => {
    let array;

    const results = [];
    while ((array = isNumbers.exec(row)) !== null) {
      results.push(array);
    }
    return results;
  });
};

const findGearParts = (arr) => {
  let gearObj = [];
  const numbers = findNumbers(arr);

  numbers.forEach((row, rowNum) => {
    return row.forEach((result) => {
      const isStar = /\*/g;

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

      const inLine = arr[rowNum].slice(startSearch, endSearch);

      let array;
      while ((array = isStar.exec(below)) !== null) {
        const id = `${rowNum + 1},${startSearch + array.index}`;
        gearObj = updateGearObj(gearObj, { id, partNumber: result[0] });
      }

      let array2;
      while ((array2 = isStar.exec(above)) !== null) {
        const id = `${rowNum - 1},${array2.index + startSearch}`;

        gearObj = updateGearObj(gearObj, { id, partNumber: result[0] });
      }

      let array3;
      while ((array3 = isStar.exec(inLine)) !== null) {
        const id = `${rowNum},${array3.index + startSearch}`;

        gearObj = updateGearObj(gearObj, { id, partNumber: result[0] });
      }
    });
  });
  return gearObj;
};

const updateGearObj = (arr, newEntry) => {
  const id = newEntry.id;
  const newPart = newEntry.partNumber;

  let isNewEntry = true;

  const copyArr = [...arr];

  for (let i = 0; i < copyArr.length; i++) {
    if (copyArr[i].id === id) {
      isNewEntry = false;
      copyArr[i] = { ...copyArr[i], parts: [...copyArr[i].parts, newPart] };
    }
  }

  if (isNewEntry) {
    return [...arr, { id, parts: [newPart] }];
  }
  return copyArr;
};

const findGears = (gearObjs) => {
  return gearObjs.filter((gearObj) => {
    return gearObj.parts.length === 2;
  });
};

const sumGearRatios = (gearRatios) => {
  return gearRatios.reduce((acc, gear) => {
    return (acc += gear.parts[0] * gear.parts[1]);
  }, 0);
};

module.exports = {
  findNumbers,
  findGearParts,
  updateGearObj,
  findGears,
  sumGearRatios,
};
