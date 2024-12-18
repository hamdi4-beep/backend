import { createReadStream } from 'fs'
import { join } from 'path'
import { Transform, TransformCallback } from 'stream'

createReadStream(join('contents', 'style-guide.md'))
    .on('error', console.error)
    .pipe(new Transform({
        transform(chunk, encoding, callback) {
            const matches = (chunk + '').match(/^#{2}\s([\S\s]+)$/)
            callback(null, matches?.[1] ?? '')
        }
    }))
    .pipe(process.stdout)