const formatData = (txt) => {
  const path = getPath(txt);
  const nodes = getNodes(txt);
  const directories = getDirectories(txt);

  const network = {};
  nodes.forEach((node, index) => {
    const nodeDirectory = directories[index];
    Object.assign(network, { [node]: nodeDirectory });
  });

  return { path, network };
};

const getPath = (txt) => {
  const pathRegex = new RegExp(`^[LR]*`, "");
  return txt.match(pathRegex)[0];
};

const getNodes = (txt) => {
  const nodeRegex = new RegExp(`[A-Z]{3}(?= \\=)`, "g");
  return txt.match(nodeRegex);
};

const getDirectories = (txt) => {
  const directoryRegex = new RegExp(`(?<=\\()[A-Z]{3}, [A-Z]{3}`, "g");
  const directoriesStr = txt.match(directoryRegex);

  return directoriesStr.map((directoryStr) => {
    const L = directoryStr.split(", ")[0];
    const R = directoryStr.split(", ")[1];
    return { L, R };
  });
};

module.exports = { getPath, getNodes, getDirectories, formatData };
