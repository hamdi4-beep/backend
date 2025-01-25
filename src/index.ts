import { spawn } from 'child_process'
import { createWriteStream, WriteStream } from 'fs'
import { join } from 'path'
import internal, { pipeline, Readable } from 'stream'

const {stdout, stderr} = spawn('git', process.argv.slice(2))

const stdoutStream = createWriteStream(join('logs', 'stdout.txt'))
const stderrStream = createWriteStream(join('logs', 'stderr.txt'))

const child = [
    [stdout, stdoutStream],
    [stderr, stderrStream]
] as [internal.Readable, WriteStream][]

pipeline(
    Readable.from(child),
    async function*(src: AsyncIterable<[internal.Readable, WriteStream]>) {
        for await (const sub of src) {
            const [std, stream] = sub
            std.pipe(stream)
        }
    },
    (err: any) => {
        if (err) {
            console.error(err)
            return
        }

        console.log('Check the logs directory for the outputs.')
    }
)