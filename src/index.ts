import { createReadStream, existsSync, readdirSync, statSync } from 'fs'
import { dirname, join } from 'path'

if (!process.argv[2]) {
    console.log('The script does not work without a provided filename.')
    process.exit(0)
}

const cwd = dirname(__dirname)
let path = ''

const ls = readdirSync(cwd, {
    encoding: 'utf-8'
}).filter(path => {
    try {
        const stats = statSync(join(cwd, path))
        if (path.startsWith('.')) return
        return stats.isDirectory()
    } catch (e) {
        console.error('Error processing the directories:', e)
    }
})

for (let i = 0; i < ls.length; i++) {
    if (existsSync(path = join(cwd, ls[i], process.argv[2]))) {
        createReadStream(path)
            .on('error', console.error)
            .pipe(process.stdout)

        break
    }
}