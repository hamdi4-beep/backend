"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = require("path");
// spawns a new process with the given command
const { stderr, stdout } = (0, child_process_1.spawn)('git', process.argv.slice(2));
const stdoutStream = (0, fs_1.createWriteStream)((0, path_1.join)('logs', 'stdout.txt'));
const stderrStream = (0, fs_1.createWriteStream)((0, path_1.join)('logs', 'stderr.txt'));
const sources = {
    out: [stdout, stdoutStream],
    err: [stderr, stderrStream]
};
for (const key in sources) {
    const [std, stream] = sources[key];
    std.pipe(stream);
}
console.log('Check the "logs" directory to find the modified files.');
