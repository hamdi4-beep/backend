import { spawn } from 'child_process'
import { createReadStream, createWriteStream, existsSync, mkdir, mkdirSync, WriteStream } from 'fs'
import { dirname, join } from 'path'
import internal, { Transform } from 'stream'

const createRange = (iteration: number): number[] =>
    iteration > 0 ? [...createRange(iteration - 1), iteration] : []

console.log(createRange(5))