const FileReadSystem = require("../src");

let fs = new FileReadSystem("./test.txt", {
  highWaterMark: 3,
});

fs.on("open", (fd) => {
  console.log("open", fd);
});

fs.on("error", (err) => {
  console.log("error", err);
});

fs.on("data", (chunk) => {
  console.log("data", chunk);
});

fs.on("end", () => {
  console.log("end");
});

fs.on("close", () => {
  console.log("close");
});
