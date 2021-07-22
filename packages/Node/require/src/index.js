const fs = require("fs");
const path = require("path");
const vm = require("vm");
const Module = require("./module");

const cusRequire = (filename) => {
  let absPath = Module._resolveFilename(filename);
  let cacheModule;
  if ((cacheModule = Module._cache[absPath])) {
    return cacheModule.exports;
  }
  let module = new Module(absPath);
  module._require = cusRequire;
  Module._cache[absPath] = module;
  module.load();
  return module.exports;
};

module.exports = cusRequire;
