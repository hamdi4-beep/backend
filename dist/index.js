"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = require("path");
const subprocess = (0, child_process_1.spawn)('python', [(0, path_1.join)('py', 'main.py'), ...process.argv.slice(2)]);
const stdOutFile = (0, fs_1.createWriteStream)((0, path_1.join)('logs', 'stdout.txt'));
const stdErrFile = (0, fs_1.createWriteStream)((0, path_1.join)('logs', 'stderr.txt'));
const [[outStd, outFile], [errStd, errFile]] = new Map([
    [subprocess.stdout, stdOutFile],
    [subprocess.stderr, stdErrFile]
]);
outStd
    .pipe(outFile)
    .on('error', console.error)
    .on('finish', () => {
    console.log('Generated a log file for stdOut.');
    stdOutFile.end();
});
errStd
    .pipe(errFile)
    .on('error', console.error)
    .on('finish', () => {
    console.log('Generated a log file for stdErr');
    stdErrFile.end();
});
subprocess.on('close', code => console.log('\nThe subprocess terminated with exit code:', code));
