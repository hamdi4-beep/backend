import { spawn } from 'child_process'
import { createWriteStream, existsSync, mkdir, mkdirSync, WriteStream } from 'fs'
import { dirname, join } from 'path'
import internal from 'stream'

const folders = 'parent_folder/sub_folder/sub_sub_folder'.split('/')

const buildPath = (currFolder: string, i: number) =>
    join(...folders.slice(0, -(folders.length - i)), currFolder)

for (let i = 0; i < folders.length; i++) {
    const currPath = buildPath(folders[i], i)
    
    if (existsSync(currPath)) {
        console.log('The path already exists!')
        break
    }

    try {
        mkdirSync(currPath)
    } catch (e) {
        console.error('Something went wrong:', e)
    }
}