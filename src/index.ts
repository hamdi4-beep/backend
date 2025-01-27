import { spawn } from 'child_process'
import { createWriteStream, WriteStream } from 'fs'
import { join } from 'path'
import internal from 'stream'

const subprocess = spawn('python', [join('py', 'main.py'), ...process.argv.slice(2)])
subprocess.on('error', console.error)

const handleStream = (std: internal.Readable, fStream: WriteStream) =>
    std
        .on('readable', async () => {
            for await (const chunk of std)
                fStream.write(`${chunk}\n`)
        })
        .on('end', () => fStream.end())

const [
    [stdOut, outFile],
    [stdErr, errFile]
] = new Map<internal.Readable, WriteStream>([
    [subprocess.stdout, createWriteStream(join('logs', 'stdout.txt'))],
    [subprocess.stderr, createWriteStream(join('logs', 'stderr.txt'))]
])

handleStream(stdOut, outFile)
handleStream(stdErr, errFile)

subprocess.on('close', code => {
    console.log('The child process exited with code status', code)
})