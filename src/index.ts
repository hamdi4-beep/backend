import { createReadStream, existsSync, readdirSync, statSync } from 'fs'
import { basename, dirname, join } from 'path'

const readFileStream = (path: string) =>
    createReadStream(path)
        .on('error', console.error)
        .pipe(process.stdout)

const path = getFilePath(basename(process.argv[2]))

if (!path) {
    console.log('No such file was found')
    process.exit(1)
}

readFileStream(path)

function getFilePath(filename: string) {
    const cwd = dirname(__dirname)
    let path = join(cwd, filename)

    const ls = readdirSync(cwd, 'utf-8').filter(item => {
        if (item.startsWith('.')) return

        try {
            const stats = statSync(item)
            return stats.isDirectory()
        } catch (e) {
            console.error(e)
        }
    })

    if (existsSync(path)) return basename(path)

    for (const dir of ls) {
        path = join(dir, filename)
        if (existsSync(path)) return path
    }
}