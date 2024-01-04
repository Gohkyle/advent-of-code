const fs = require("node:fs/promises");

fs.readFile(`${__dirname}/test-input.txt`, "utf-8")
  .then((response) => response.split("\n"))
  .then((response) => {
    return response.map((row) => row.split(""));
  })
  .then((response) => {
    fs.writeFile(
      `${__dirname}/test-input.json`,
      JSON.stringify(response),
      "utf-8"
    );
  });
