import { spawn } from 'child_process'
import { createWriteStream, existsSync, mkdir, mkdirSync, WriteStream } from 'fs'
import { dirname, join } from 'path'
import internal from 'stream'

const path = buildPath(dirname('/parent-folder/sub-folder/sub-sub-folder/file.txt'))
console.log(path)

function buildPath(path: string) {
    const dirs = path.split('/')
    let currPath = ''

    if (path.startsWith('/'))
        dirs.shift()
    
    for (let i = 0; i < dirs.length; i++) {
        const currDir = dirs[i]
        currPath = join(...dirs.slice(0, -(dirs.length - i)), currDir)

        if (existsSync(currPath)) {
            console.log('The path already exists!')
            break
        }

        console.log(currPath)
    }

    return currPath
}