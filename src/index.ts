import { createReadStream } from 'fs'
import { join } from 'path'
import { PassThrough, pipeline, Readable, Transform } from 'stream'

const monitor = new PassThrough({
    transform(chunk, encoding, callback) {
        this.push(chunk + '\n')
        callback()
    }
})

const joinFiles = (files: string[]) =>
    new Promise((resolve, reject) =>
        Readable
            .from(files)
            .on('data', filename =>
                createReadStream(join('files', filename))
                    .on('error', reject)
                    .pipe(monitor)
                    .on('finish', resolve)
            )
    )

joinFiles(['style-guide.md', 'results.txt'])
    .then(() => monitor.pipe(process.stdout))
    .catch(console.error)