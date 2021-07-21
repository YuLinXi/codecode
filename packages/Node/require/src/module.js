const path = require("path");

const Module = (id) => {
  this.id = id;
  this.exports = {};
};

Module._resolveFilename = function (filename) {
  return path.resolve(__dirname, filename);
};

module.exports = Module;
