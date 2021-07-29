const FileWriteSystem = require("../src");

const ws = new FileWriteSystem("./test.txt", {
  highWaterMark: 1,
});

ws.on("open", (fd) => {
  console.log("--open-->", fd);
});

ws.write("1141", "utf8", () => {
  console.log("ok1");
});

ws.write("12323", "utf8", () => {
  console.log("ok2");
});

ws.on("err", (err) => {
  console.log(err);
});

ws.on("drain", () => {
  console.log("drain");
});
