import { createReadStream } from 'fs'
import { join } from 'path'
import { PassThrough, Readable } from 'stream'

readFiles(['style-guide.md', 'results.txt'])
    .then(() => console.log('Finished processing the files successfully.'))

function readFiles(files: string[]) {
    const passThrough = new PassThrough()

    return new Promise((resolve, reject) => Readable
        .from(files)
        .on('data', filename => {
            createReadStream(join('files', filename))
                .on('error', reject)
                .pipe(passThrough)
                .pipe(process.stdout)
        })
        .on('end', () => passThrough.on('finish', resolve))
    )
}