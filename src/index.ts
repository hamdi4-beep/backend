import { fork } from 'child_process'
import { createReadStream } from 'fs'
import { createServer } from 'net'
import { join } from 'path'
import { pipeline, Readable } from 'stream'

process.env.PORT = '8080'

const server = createServer(socket => {
    console.log('Client connected!')
    socket.pipe(process.stdout)
})

server.listen(process.env.PORT, () => console.log('Running on port:', process.env.PORT))