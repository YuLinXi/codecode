const cusRequire = require("../src");
const hello = cusRequire("./hello");
const test = cusRequire("./test");

console.log("hello", hello);
console.log("test", test);
