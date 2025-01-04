import { createReadStream } from 'fs'
import * as net from 'net'
import { join } from 'path'

const HOST = 'localhost'
const PORT = 3000

// Server

const server = net.createServer()
server.listen(PORT, () => console.log('Running on port:', PORT))

server.on('connection', socket =>
    socket
        .on('data', buffer => {
            const data = buffer.toString()
            console.log(data)
        })
        .on('close', () => console.log('Lost a connection with the TCP socket.'))
)

// Client

const socket = net.createConnection(PORT, HOST, () => {
    socket.write('Received some data from the TCP socket.')

    socket
        .on('timeout', () => socket.end())
        .setTimeout(5000)
})