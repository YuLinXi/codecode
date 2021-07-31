const fs = require("fs");
const pathModule = require("path");
const EventEmitter = require("events");
const Queue = require("./queue");

class FileWriteSystem extends EventEmitter {
  constructor(path, options = {}) {
    super();
    this.path = pathModule.join(process.cwd(), path);
    this.flags = options.flags || "w";
    this.mode = options.mode || 438;
    this.autoClose = options.autoClose || true;
    this.start = options.start || 0;
    this.encoding = options.encoding || "utf8";
    this.highWaterMark = options.highWaterMark || 16 * 1024;
    this.writeOffset = this.start;
    this.writing = false;
    this.writeLen = 0;
    this.needDrain = false;
    this.cache = new Queue();

    this.open();
  }

  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        this.emit("err", err);
      } else {
        this.fd = fd;
        this.emit("open", fd);
      }
    });
  }

  write(chunk, encoding, callback) {
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    this.writeLen += chunk.length;
    let flag = this.writeLen < this.highWaterMark;
    this.needDrain = !flag;
    if (this.writing) {
      this.cache.enQueue({ chunk, encoding, callback });
    } else {
      this._write(chunk, encoding, () => {
        callback();
        this._clearBuffer();
      });
    }

    return flag;
  }

  _write(chunk, encoding, callback) {
    this.writing = true;
    if (typeof this.fd !== "number") {
      return this.once("open", () => this._write(chunk, encoding, callback));
    }
    fs.write(this.fd, chunk, this.start, chunk.length, this.writeOffset, (err, writeBytes) => {
      if (err) {
        this.emit("err", err);
      } else {
        this.writeOffset += writeBytes;
        this.writeLen -= writeBytes;
        callback && callback();
      }
    });
  }

  _clearBuffer() {
    let data = this.cache.deQueue();
    if (data) {
      this._write(data.element.chunk, data.element.encoding, () => {
        data.element.callback && data.element.callback();
        this._clearBuffer();
      });
    } else {
      if (this.needDrain) {
        this.needDrain = false;
        this.emit("drain");
      }
    }
  }
}

module.exports = FileWriteSystem;
