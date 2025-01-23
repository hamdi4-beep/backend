"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const http_1 = require("http");
const path_1 = require("path");
const PORT = 3000;
const server = (0, http_1.createServer)();
server.listen(PORT, () => console.log('Running on port:', PORT));
server.on('connection', socket => {
    console.log('Connected!');
    socket.pipe(process.stdout);
});
const { stdout, stderr } = (0, child_process_1.spawn)('node', [(0, path_1.join)('dist', 'client/index.js')]);
stdout.pipe(process.stdout);
