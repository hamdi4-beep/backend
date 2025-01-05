import { createReadStream } from 'fs'
import * as net from 'net'
import { join } from 'path'

const PORT = parseInt(process.env.PORT as string)

const socket = net.createConnection(PORT, 'localhost', () =>
    socket
        .pipe(process.stdout)
)