"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = require("path");
const stream_1 = require("stream");
const { stdout, stderr } = (0, child_process_1.spawn)('git', process.argv.slice(2));
const stdoutStream = (0, fs_1.createWriteStream)((0, path_1.join)('logs', 'stdout.txt'));
const stderrStream = (0, fs_1.createWriteStream)((0, path_1.join)('logs', 'stderr.txt'));
const child = [
    [stdout, stdoutStream],
    [stderr, stderrStream]
];
(0, stream_1.pipeline)(stream_1.Readable.from(child), function (src) {
    return __asyncGenerator(this, arguments, function* () {
        var _a, e_1, _b, _c;
        try {
            for (var _d = true, src_1 = __asyncValues(src), src_1_1; src_1_1 = yield __await(src_1.next()), _a = src_1_1.done, !_a; _d = true) {
                _c = src_1_1.value;
                _d = false;
                const sub = _c;
                const [std, stream] = sub;
                std.pipe(stream);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = src_1.return)) yield __await(_b.call(src_1));
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Check the logs directory for the outputs.');
});
