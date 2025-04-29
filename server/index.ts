import { connect } from 'net'
import * as process from "node:process";

const BINDING_PORT = 8000

const socket = connect(BINDING_PORT, 'localhost', () => {
    console.log('Connected to the remote socket')
    socket.end('This was sent through a Node.js server!')
})

socket
    .on('error', console.error)
    .pipe(process.stdout)