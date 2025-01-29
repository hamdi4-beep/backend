import { spawn } from 'child_process'
import { createReadStream, createWriteStream, existsSync, mkdir, mkdirSync, WriteStream } from 'fs'
import { dirname, join } from 'path'
import internal, { Transform } from 'stream'

const path = buildPath('logs')

const subprocess = spawn('python', [join('py', 'main.py'), ...process.argv.slice(2)])
subprocess.on('error', console.error)

const children = new Map<internal.Readable, WriteStream>([
    [subprocess.stdout, createWriteStream(join(path, 'stdout.txt'))],
    [subprocess.stderr, createWriteStream(join(path, 'stderr.txt'))]
])

for (const child of children) {
    const [readableStream, writeableStream] = child

    readableStream
        .on('error', console.error)
        .pipe(writeableStream)
        .on('finish', () => {
            console.log('Generated', writeableStream.path)
            writeableStream.end()
        })
}

function buildPath(path: string) {
    if (!existsSync(path))
        mkdirSync(path)

    return path
}