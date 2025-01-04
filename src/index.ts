import { fork, spawn } from 'child_process'
import { createReadStream } from 'fs'
import * as net from 'net'
import { join } from 'path'
import { pipeline, Transform } from 'stream'

process.env.PORT = '3000'

const server = net.createServer()
server.listen(process.env.PORT, () => console.log('Listening on port:', process.env.PORT))

server.on('connection', socket =>
    socket
        .on('close', () => console.log('TCP Socket closed the connection.'))
        .pipe(new Transform({
            transform(chunk, encoding, callback) {
                this.push(chunk + '\n')
                callback()
            }
        }))
        .pipe(process.stdout)
)

const child = fork(join('dist', 'client/index.js'))