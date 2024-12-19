import { createReadStream, createWriteStream } from 'fs'
import { basename, join } from 'path'
import { pipeline, Transform } from 'stream'

const filename = basename(process.argv[2] ?? '')

if (!filename) {
    console.error('Expected a filename.')
    process.exit(1)
}

const filterByRegex = (regex: RegExp) => {
    const results = [] as string[]

    return new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
            const lines = (chunk + '').split('\n')
            results.push(...lines.filter(line => regex.test(line)))
            callback()
        },
        flush(callback) {
            this.push(JSON.stringify(results, null, '\t'))
            callback()
        }
    })
}

pipeline(
    createReadStream(join('files', filename)),
    filterByRegex(/-\s(?:[\S\s]+):/),
    process.stdout,
    (err: any) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }

        console.log('The operation was a success.')
    }
)