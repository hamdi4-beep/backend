import { createReadStream, createWriteStream } from 'fs'
import { basename, join } from 'path'
import { pipeline, Transform } from 'stream'

const filename = basename(process.argv[2] ?? '')

if (!filename) {
    console.error('Expected a filename.')
    process.exit(1)
}

const filterByRegex = (regex: RegExp) => new Transform({
    transform(chunk, encoding = 'utf8', callback) {
        const lines = (chunk + '').split('\n')
        callback(null, lines.filter(line => regex.test(line)).join('\n'))
    },
})

pipeline(
    createReadStream(join('files', filename)),
    filterByRegex(/-\s(?:[\S\s]+):/),
    createWriteStream('results.txt'),
    (err: any) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }

        console.log('The operation was a success.')
    }
)