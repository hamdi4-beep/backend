import { fork, spawn } from 'child_process'
import { createReadStream } from 'fs'
import * as net from 'net'
import { join } from 'path'
import { pipeline, Transform } from 'stream'

process.env.PORT = '3000'

const child = fork(
    join('dist', 'client/index.js')
)

const readStream = createReadStream(join('files', 'style-guide.md'))

const server = net.createServer(socket => {
    console.log('Server: Connected to the client.')
    readStream.pipe(socket)
})

server.listen(process.env.PORT, () => console.log('Running on port:', process.env.PORT))