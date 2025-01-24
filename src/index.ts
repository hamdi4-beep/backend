import { createReadStream } from 'fs'
import { join } from 'path'
import { pipeline, Transform } from 'stream'

const readStream = createReadStream(join('files', 'style-guide.md'))

const createSplitTransform = (separator: string) => new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
        for (const line of (chunk + '').split(separator))
            this.push(line + '\n')

        callback()
    }
})

const createFilterTransform = (searchStr: string) => new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
        if ((chunk += '').startsWith(searchStr))
            this.push(chunk)

        callback()
    }
})

pipeline(
    readStream,
    createSplitTransform('\n'),
    createFilterTransform('-'),
    async function*(src) {
        for await (const chunk of src) {
            const decoded = chunk.toString()
            console.log(decoded)
        }
    },
    (err: any) => {
        if (err) {
            console.error(err)
            return
        }

        console.log('The pipeline operation was successful!')
    }
)