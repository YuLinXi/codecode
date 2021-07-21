const fs = require("fs");
const path = require("path");
const vm = require("vm");
const Module = require("./module");

const cusRequire = (filename) => {
  let absPath = Module._resolveFilename(filename);
  console.log(absPath);
};

module.exports = cusRequire;
