import { connect } from 'net'
import * as process from "node:process";

const BINDING_PORT = 8000

const socket = connect(BINDING_PORT, 'localhost', () => {
    console.log('Connected to a remote socket.')
    process.stdin.pipe(socket)
})

socket
    .on('error', (err: any) => {
        if (err.code == 'ECONNREFUSED') {
            console.log('Check that the remote socket is actively listening for connections.')
            return
        }

        console.error(err)
    })
    .pipe(process.stdout)