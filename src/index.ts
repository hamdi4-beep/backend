import { createReadStream, createWriteStream } from 'fs'
import { join } from 'path'
import { pipeline, Transform } from 'stream'

const filterByRegex = (regex: RegExp) => new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
        const lines = (chunk + '').split('\n')

        lines.forEach(line => {
            if (regex.test(line)) {
                line = line.substring(2)
                this.push(line + '\n')
            }
        })

        callback()
    }
})

pipeline(
    createReadStream(join('files', process.argv[2] ?? 'style-guide.md')),
    filterByRegex(/-\s(?:[\S\s]+):/),
    createWriteStream('results.txt'),
    (err: any) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }

        console.log('The operation was a success!')
    }
)