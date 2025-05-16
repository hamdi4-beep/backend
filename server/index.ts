import { createReadStream } from 'fs'
import { connect } from 'net'
import * as process from "node:process";

const socket = connect(8000, 'localhost', () => console.log('Connected to the remote socket'))

socket
    .on('error', console.error)
    .on('connect', () => {
        const readStream = createReadStream('package.json').on('error', console.error)

        readStream
            .pipe(socket)
            .on('end', () => console.log('File sent to the remote socket!'))
    })