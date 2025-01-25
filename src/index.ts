import { spawn } from 'child_process'
import { createWriteStream, WriteStream } from 'fs'
import { join } from 'path'
import internal, { pipeline } from 'stream'

// spawns a new process with the given command
const {stderr, stdout} = spawn('git', 'remote get-url origin'.split(' '))

const stdoutStream = createWriteStream(join('logs', 'stdout.txt'))
const stderrStream = createWriteStream(join('logs', 'stderr.txt'))

const sources = {
    out: [stdout, stdoutStream],
    err: [stderr, stderrStream]
} as {
    [x: string]: [internal.Readable, WriteStream]
}

for (const key in sources) {
    const [std, stream] = sources[key]
    std.pipe(stream)
}