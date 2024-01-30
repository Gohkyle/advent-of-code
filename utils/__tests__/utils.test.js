const { txtToJSON } = require("../utils");
const mock = require("mock-fs");
const fs = require("fs");

describe("txtToJSON()", () => {
  describe("extracted txtToJSON function, now takes a formatData function", () => {
    beforeAll(() => {
      mock({
        folderName: {
          "test-input.txt": `abcdefghijklmnopqrstuvwxyz`,
        },
      });
    });

    afterAll(() => {
      mock.restore();
    });

    const filePath = `${process.cwd()}/folderName/test-input`;

    test("new file is created with suffix.JSON", () => {
      const expectedFolder = ["test-input.json", "test-input.txt"];
      const formatFn = (txt) => {
        return txt.toUpperCase();
      };

      return txtToJSON(filePath, formatFn).then(() => {
        const folder = fs.readdirSync(`${process.cwd()}/folderName`);
        expect(folder).toEqual(expectedFolder);
      });
    });
    test("new file exhibits formatting from the formatFn passed", () => {
      const newFileOutput = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const formatFn = (txt) => {
        return txt.toUpperCase();
      };

      return txtToJSON(filePath, formatFn).then(() => {
        const fileJSON = fs.readFileSync(`${filePath}.json`, "utf-8");
        expect(fileJSON).toEqual(JSON.stringify(newFileOutput));
      });
    });
  });
});
