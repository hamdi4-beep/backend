import { createReadStream, createWriteStream } from 'fs'
import { join } from 'path'
import { Transform } from 'stream'

const readStream = createReadStream(join('files', 'style-guide.md'))

const createSplitTransform = () => new Transform({
    transform(chunk, encoding, callback) {
        for (const line of (chunk + '').split('\n'))
            this.push(line + '\n')

        callback()
    }
})

const createFilterTransform = (searchString: string) => new Transform({
    transform(chunk: string, encoding, callback) {
        if ((chunk = chunk + '').startsWith(searchString)) {
            const result = chunk.substring(2)
            this.push(result)
        }

        callback()
    }
})

readStream
    .on('error', console.error)
    .pipe(createSplitTransform())
    .pipe(createFilterTransform('##'))
    .pipe(process.stdout)