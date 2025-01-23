import { spawn } from 'child_process'
import { createServer } from 'http'
import { join } from 'path'

const PORT = 3000

const server = createServer()
server.listen(PORT, () => console.log('Running on port:', PORT))

server.on('connection', socket => {
    console.log('Connected!')
    socket.pipe(process.stdout)
})

const {stdout, stderr} = spawn('node', [join('dist', 'client/index.js')])

stdout.pipe(process.stdout)
stderr.pipe(process.stderr)