import {spawn} from 'child_process'
import { createWriteStream, WriteStream } from 'fs'
import { join } from 'path'
import internal from 'stream'

const subprocess = spawn('python', [join('py', 'main.py'), ...process.argv.slice(2)])

const stdOutFile = createWriteStream(join('logs', 'stdout.txt'))
const stdErrFile = createWriteStream(join('logs', 'stderr.txt'))

const [
    [outStd, outFile],
    [errStd, errFile]
] = new Map<internal.Readable, WriteStream>([
    [subprocess.stdout, stdOutFile],
    [subprocess.stderr, stdErrFile]
])

outStd
    .pipe(outFile)
    .on('error', console.error)
    .on('finish', () => {
        console.log('Generated a log file for stdOut.')
        stdOutFile.end()
    })

errStd
    .pipe(errFile)
    .on('error', console.error)
    .on('finish', () => {
        console.log('Generated a log file for stdErr')
        stdErrFile.end()
    })

subprocess.on('close', code =>
    console.log('\nThe subprocess terminated with exit code:', code)
)