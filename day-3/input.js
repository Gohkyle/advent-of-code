const fs = require("node:fs/promises");

fs.readFile(`${__dirname}/data/test-input.txt`, "utf-8")
  .then((response) => response.split("\n"))
  .then((response) => {
    fs.writeFile(
      `${__dirname}/data/test-input.json`,
      JSON.stringify(response),
      "utf-8"
    );
  });
