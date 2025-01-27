"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = require("path");
const subprocess = (0, child_process_1.spawn)('python', [(0, path_1.join)('py', 'main.py'), ...process.argv.slice(2)]);
const handleStream = (std, fStream) => std
    .on('readable', () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    try {
        for (var _d = true, std_1 = __asyncValues(std), std_1_1; std_1_1 = yield std_1.next(), _a = std_1_1.done, !_a; _d = true) {
            _c = std_1_1.value;
            _d = false;
            const chunk = _c;
            fStream.write(`${chunk}\n`);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = std_1.return)) yield _b.call(std_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}))
    .on('end', () => fStream.end());
const [[stdOut, outFile], [stdErr, errFile]] = new Map([
    [subprocess.stdout, (0, fs_1.createWriteStream)((0, path_1.join)('logs', 'stdout.txt'))],
    [subprocess.stderr, (0, fs_1.createWriteStream)((0, path_1.join)('logs', 'stderr.txt'))]
]);
handleStream(stdOut, outFile);
handleStream(stdErr, errFile);
subprocess.on('close', code => {
    console.log('The child process exited with code status', code);
});
