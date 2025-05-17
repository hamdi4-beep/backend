import { createReadStream } from 'fs'
import { connect } from 'net'

const BINDING_PORT = 8000

const socket = connect(BINDING_PORT, 'localhost', () => {
    console.log('Connected to the remote socket.')
    sendFile('tsconfig.json')
})

socket.on('error', (err: any) => {
    if (err.code == 'ECONNREFUSED') {
        console.log('The remote socket is not currently listening.')
        return
    }

    console.error(err)
})

function sendFile(filename: string) {
    return createReadStream(filename)
        .on('error', console.error)
        .pipe(socket)
        .on('end', () => console.log('Finished sending over the file.'))
}