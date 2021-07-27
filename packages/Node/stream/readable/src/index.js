const fs = require("fs");
const pathModule = require("path");
const EventEmitter = require("events");

class FileReadSystem extends EventEmitter {
  constructor(path, options = {}) {
    super();
    this.path = pathModule.join(process.cwd(), path);
    this.flags = options.flags || "r";
    this.mode = options.mode || 438;
    this.autoClose = options.autoClose || true;
    this.start = options.start || 0;
    this.end = options.end;
    this.highWaterMark = options.highWaterMark || 64 * 1024;
    this.readOffset = 0;

    this.open();
    this.on("newListener", (type) => {
      if (type === "data") {
        this.read();
      }
    });
  }

  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        this.emit("error", err);
      } else {
        this.fd = fd;
        this.emit("open", fd);
      }
    });
  }

  close() {
    fs.close(this.fd, (err) => {
      this.emit("close");
    });
  }

  read() {
    if (typeof this.fd !== "number") {
      return this.once("open", this.read);
    }
    let buf = Buffer.alloc(this.highWaterMark);
    fs.read(this.fd, buf, 0, this.highWaterMark, this.readOffset, (err, readBytes) => {
      if (readBytes) {
        this.readOffset += readBytes;
        this.emit("data", buf.slice(0, readBytes));
        this.read();
      } else {
        this.emit("end");
        this.close();
      }
    });
  }
}

module.exports = FileReadSystem;
