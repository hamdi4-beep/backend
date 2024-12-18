import { createReadStream, existsSync, readdirSync, statSync } from 'fs'
import { basename, dirname, join } from 'path'

const filename = basename(process.argv[2])

if (!filename) {
    console.log('The filename was not provided.')
    process.exit(1)
}

const cwd = dirname(__dirname)
let path = '', filefound = false

const ls = readdirSync(cwd, 'utf-8').filter(item => {
    if (item.startsWith('.')) return

    try {
        const stats = statSync(item)
        return stats.isDirectory()
    } catch (e) {
        console.error(e)
    }
})

const readFileStream = (path: string) =>
    createReadStream(path)
        .on('error', console.error)
        .pipe(process.stdout)

for (const dir of ls) {
    path = join(dir, filename)

    if (filefound = existsSync(path)) {
        readFileStream(path)
        break
    }
}

if (!filefound) console.log('No such file was found within the subdirectories.')