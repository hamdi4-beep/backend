import {spawn} from 'child_process'
import { createWriteStream, WriteStream } from 'fs'
import { join } from 'path'
import internal from 'stream'

const subprocess = spawn('python', [join('py', 'main.py'), ...process.argv.slice(2)])

const stdOutFile = createWriteStream(join('logs', 'stdout.txt'))
const stdErrFile = createWriteStream(join('logs', 'stderr.txt'))

const [
    [stdOut, outFile],
    [stdErr, errFile]
] = new Map<internal.Readable, WriteStream>([
    [subprocess.stdout, stdOutFile],
    [subprocess.stderr, stdErrFile]
])

handleStream(stdOut, outFile, 'standard output')
handleStream(stdErr, errFile, 'standard error')

subprocess.on('close', code =>
    console.log('\nThe subprocess terminated with exit code:', code)
)

function handleStream(std: internal.Readable, fStream: WriteStream, label: string) {
    std
        .on('error', console.error)
        .pipe(fStream)
        .on('finish', () => {
            console.log('Generated a log file for', label)
            fStream.close()
        })
}