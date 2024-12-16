import { createReadStream } from 'fs'
import { join } from 'path'

const args = process.argv.slice(2)
readFile()

function readFile() {
    for (const arg of args) {
        const splits = arg.split('.')

        if (splits.pop() !== 'md') {
            console.log('Only MD files are allowed!')
            process.exit(0)
        }
    }

    createReadStream(join('public', ...args))
        .on('error', (err: any) => {
            if (err.code === 'ENOENT') {
                console.log('No such file exists.')
                return
            }

            console.error(err)
        })
        .pipe(process.stdout)
}