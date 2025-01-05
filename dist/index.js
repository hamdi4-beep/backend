"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
process.env.PORT = '8080';
const server = (0, net_1.createServer)(socket => {
    console.log('Client connected!');
    socket.pipe(process.stdout);
});
server.listen(process.env.PORT, () => console.log('Running on port:', process.env.PORT));
