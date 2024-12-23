import { createReadStream, createWriteStream, WriteStream } from 'fs'
import { join } from 'path'
import { PassThrough, pipeline, Readable, Transform } from 'stream'

const handleFiles = (files: string[]) =>
    new Promise((resolve, reject) =>
        pipeline(
            Readable.from(files),
            new Transform({
                objectMode: true,
                transform(filename, encoding, callback) {
                    createReadStream(join('files', filename + ''))
                        .on('error', reject)
                        .on('data', chunk => this.push(chunk + '\n'))
                        .on('end', callback)
                }
            }),
            process.stdout,
            (err: any) => {
                if (err) {
                    reject(err)
                    process.exit(1)
                }

                resolve(null)
            }
        )
    )

handleFiles(['style-guide.md', 'results.txt'])
    .then(() => console.log('The pipeline operation was successful.'))
    .catch(console.error)