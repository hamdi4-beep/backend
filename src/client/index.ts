import * as net from 'net'

const PORT = parseInt(process.env.PORT!)

const socket = net.createConnection(PORT, 'localhost', () =>
    socket.write('TCP Socket established a connection!')
)

socket
    .on('timeout', () => socket.end())
    .setTimeout(5000)