import { spawn } from 'child_process'
import { createWriteStream, existsSync, mkdir, mkdirSync, WriteStream } from 'fs'
import { dirname, join } from 'path'
import internal from 'stream'

const folders = 'parent_folder/sub_folder/sub_sub_folder'.split('/')

for (let i = 0; i < folders.length; i++) {
    const currFolder = folders[i]
    
    if (!existsSync(currFolder)) {
        const currPath = folders.slice(0, -(folders.length - i))
        mkdirSync(join(...currPath, currFolder))
    }
}