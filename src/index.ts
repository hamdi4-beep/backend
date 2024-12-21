import { createReadStream } from 'fs'
import { join } from 'path'
import { PassThrough, pipeline, Readable, Transform, Writable } from 'stream'

const files = ['style-guide.md', 'results.txt']

Readable
    .from(files)
    .on('data', filename => {
        const passThrough = new PassThrough({
            objectMode: true,
            transform(chunk, enc, callback) {
                this.push(chunk + '\n')
            }
        })
        
        pipeline(
            createReadStream(join('files', filename)),
            passThrough,
            process.stdout,
            (err: any) => {
                if (err) {
                    console.error(err)
                    process.exit(1)
                }

                console.log('The pipeline operation was a success.')
            }
        )
    })