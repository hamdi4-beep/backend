import { createReadStream } from 'fs'
import { join } from 'path'
import { pipeline, Transform } from 'stream'

const createSplitTransform = () => new Transform({
    objectMode: true,
    transform(chunk: string | Buffer, encoding, callback) {
        for (const line of (chunk + '').split('\n'))
            this.push(line + '\n')

        callback()
    }
})

const createFilterTransform = (searchStr: string) => new Transform({
    objectMode: true,
    transform(chunk: string | Buffer, encoding, callback) {
        if ((chunk = chunk + '').startsWith(searchStr)) {
            const result = chunk.substring(2)
            this.push(result)
        }

        callback()
    }
})

pipeline(
    createReadStream(join('files', 'style-guide.md')),
    createSplitTransform(),
    createFilterTransform('-'),
    process.stdout,
    (err: any) => {
        if (err) {
            console.error(err)
            return
        }

        console.log('The pipeline operation was successful')
    }
)