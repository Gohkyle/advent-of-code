const path = require("path");

const fs = jest.createMockFromModule("fs");

let mockFiles = Object.create(null);
function __setMockFiles(newMockFiles) {
  mockFiles = Object.create(null);
  for (const file in newMockFiles) {
    const dir = path.dirname(file);

    if (!mockFiles[dir]) {
      mockFiles[dir] = [];
    }
    mockFiles[dir].push(path.basename(file));
  }
}

// A custom version of `readdirSync` that reads from the special mocked out
// file list set via __setMockFiles
function readdirSync(directoryPath) {
  return mockFiles[directoryPath] || [];
}

function writeFile(file, data, options) {
  const dir = path.dirname(file);

  return mockFiles[dir].push(path.basename(data));
  return;
}

fs.__setMockFiles = __setMockFiles;
fs.readdirSync = readdirSync;
fs.writeFile = writeFile;

module.exports = fs;
