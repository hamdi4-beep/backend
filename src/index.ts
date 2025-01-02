import * as fs from 'fs'
import { join } from 'path'
import { EventEmitter } from 'stream'

const rs = fs.createReadStream(join('files', 'style-guide.md'))
let buffer: Buffer

setTimeout(() => {
    const decoder = new TextDecoder()
    console.log(decoder.decode(buffer))
}, 10)

rs.on('readable', async () => {
    for await (const chunk of rs)
        buffer = Buffer.alloc(chunk.length, chunk)
})