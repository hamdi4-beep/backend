"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const stream_1 = require("stream");
(0, fs_1.createReadStream)((0, path_1.join)('contents', 'style-guide.md'))
    .on('error', console.error)
    .pipe(new stream_1.Transform({
    transform(chunk, encoding, callback) {
        var _a;
        const matches = (chunk + '').match(/^#{2}\s([\S\s]+)$/);
        callback(null, (_a = matches === null || matches === void 0 ? void 0 : matches[1]) !== null && _a !== void 0 ? _a : '');
    }
}))
    .pipe(process.stdout);
