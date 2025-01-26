import { spawn } from 'child_process'
import { createWriteStream, WriteStream } from 'fs'
import { join } from 'path'
import internal from 'stream'

const subprocess = spawn('python', [join('py', 'main.py'), ...process.argv.slice(2)])

const stdoutFile = createWriteStream(join('logs', 'stdout.txt'))
const stderrFile = createWriteStream(join('logs', 'stderr.txt'))

const logTime = (new Date).toLocaleString()

const [
    [stdout, outFile],
    [stderr, errFile]
] = new Map<internal.Readable, WriteStream>([
    [subprocess.stdout, stdoutFile],
    [subprocess.stderr, stderrFile]
])

process.stdin.pipe(subprocess.stdin)

handleStream(stdout, outFile)
handleStream(stderr, errFile)

subprocess.on('close', code =>
    console.log('\nThe child process exited with status code:', code)
)

function handleStream(std: internal.Readable, fStream: WriteStream) {
    std
        .on('readable', async () => {
            for await (const chunk of std)
            fStream.write(`${logTime}:\n${chunk}\n\n`)
        })
        .on('end', () => {
            console.log('Generated a log file in the "logs" directory!')
            fStream.end()
        })
}