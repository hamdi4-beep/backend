import { createReadStream, createWriteStream, existsSync, readdirSync } from 'fs'
import { basename, dirname, join, resolve } from 'path'
import { Transform } from 'stream'

if (!process.argv[2]) {
    console.log('Provide the filename argument.')
    process.exit(1)
}

const filename = basename(process.argv[2])

const filterByRegEx = (regex: RegExp) => new Transform({
    transform(chunk, encoding, callback) {
        const splitted = (chunk + '').split('\n')
        this.push(JSON.stringify(splitted.filter(it => regex.test(it)), null, '\t'))
    }
})

createReadStream(findFilePath(filename) as string)
    .on('error', handleError)
    .pipe(filterByRegEx(/-\s(?:[\S\s]+)/))
    .pipe(process.stdout)

function handleError(err: any) {
    if (err.code === 'ENOTENT') {
        console.log('No such file was found.')
        process.exit(1)
    }

    console.error(err)
}

function findFilePath(filename: string) {
    const ls = readdirSync(dirname(__dirname), 'utf8')
    let path = ''

    for (const dir of ls) {
        if (!existsSync(join(dir, filename))) continue
        return resolve(dir, filename)
    }

    if (!path) {
        console.log('No such file exists within the subdirectories.')
        return
    }
}