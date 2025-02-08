import { spawn } from "child_process";
import { createReadStream, createWriteStream } from "fs";
import { createServer, IncomingMessage, ServerResponse } from "http";
import { connect } from "net";
import { join, resolve } from "path";
import { pipeline, Readable } from "stream";

const subprocess = spawn('node', [join('dist', 'client/index.js')])

const server = createServer()
server.listen(3000, () => console.log('The server is listening on port:', 3000))

server.on('connection', socket =>
    console.log('A client is connected to the server!')
)

subprocess.on('error', console.error)

subprocess.stderr.pipe(process.stderr)
subprocess.stdout.pipe(process.stdout)

subprocess.on('close', code =>
    console.log('The child process terminated with code status:', code)
)