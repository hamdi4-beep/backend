"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
const socket = (0, net_1.connect)(3000);
console.log(socket);
socket.end();
