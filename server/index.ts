import { connect } from 'net'
import express from 'express'
import { createReadStream } from 'fs'

const BINDING_PORT = 8000

const app = express()
app.listen(3000, () => console.log('Listening in for requests on port', 3000))

app.use(express.urlencoded())

app.post('/', (request, response) => {
    const value = Object.keys(request.body)[0]
    
    const socket = connect(BINDING_PORT, 'localhost', () => {
        console.log('Connected to the remote socket.')
        socket.end(value)
    })

    socket
        .on('error', (err: any) => {
            if (err.code === 'ECONNREFUSED') {
                console.log('Make sure the listening socket is active.')
                return
            }

            console.error(err)
        })
        .pipe(response)
})