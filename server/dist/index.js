"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
const express_1 = __importDefault(require("express"));
const BINDING_PORT = 8000;
const app = (0, express_1.default)();
app.listen(3000, () => console.log('Listening in for requests on port', 3000));
app.use(express_1.default.urlencoded());
app.post('/', (request, response) => {
    const value = Object.keys(request.body)[0];
    const socket = (0, net_1.connect)(BINDING_PORT, 'localhost', () => {
        console.log('Connected to the remote socket.');
        socket.end(value);
    });
    socket
        .on('error', (err) => {
        if (err.code === 'ECONNREFUSED') {
            console.log('Make sure the listening socket is active.');
            return;
        }
        console.error(err);
    })
        .pipe(response);
});
