const path = require("path");
const fs = require("fs");
const vm = require("vm");

const Module = function (id) {
  this.id = id;
  this.exports = {};
};

Module._extensions = {
  ".js": (module) => {
    let content = fs.readFileSync(module.id, "utf8");
    content = Module.wrapper[0] + content + Module.wrapper[1];
    let compileFn = vm.runInThisContext(content);
    let exports = module.exports;
    let dirname = path.dirname(module.id);
    let filename = module.id;
    compileFn.call(exports, exports, module._require, module, filename, dirname);
  },
  ".json": (module) => {
    let content = fs.readFileSync(module.id, "utf8");
    try {
      content = JSON.parse(content);
      module.exports = content;
    } catch (err) {
      throw new Error(`${module.id} parse error`);
    }
  },
};

Module._cache = {};

Module.wrapper = ["(function(exports, require, module, __filename, __dirname){", "})"];

Module._resolveFilename = function (filename) {
  const absPath = path.resolve(process.cwd(), filename);
  if (fs.existsSync(absPath)) {
    return absPath;
  } else {
    let suffix = Object.keys(Module._extensions);
    let newPath;
    suffix.some((suf) => {
      return fs.existsSync((newPath = absPath + suf));
    });
    if (newPath) {
      return newPath;
    }
    throw new Error(`${filename} is not exists`);
  }
};

Module.prototype.load = function () {
  const { id } = this;
  const extname = path.extname(id);
  if (Module._extensions[extname]) {
    Module._extensions[extname](this);
  }
  // const content = fs.readFileSync(id, "utf8");
  // console.log(extname, content);
};

module.exports = Module;
