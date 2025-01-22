import { createReadStream, createWriteStream } from 'fs'
import { join } from 'path'
import { Transform } from 'stream'

const readStream = createReadStream(join('files', 'style-guide.md'))

readStream
    .on('error', console.error)
    .pipe(createSplitTransform())
    .pipe(createFilterTransform('-'))
    .pipe(createWriteStream('style.txt'))

readStream
    .on('end', () => console.log('Created a new file in the root directory.'))

function createSplitTransform() {
    return new Transform({
        transform(chunk, encoding, callback) {
            for (const line of (chunk + '').split('\n'))
                this.push(line + '\n')

            callback()
        }
    })
}

function createFilterTransform(searchString: string) {
    return new Transform({
        transform(chunk: string, encoding, callback) {
            if ((chunk = chunk + '').startsWith(searchString)) {
                const result = chunk.substring(2)
                this.push(result)
            }

            callback()
        }
    })
}