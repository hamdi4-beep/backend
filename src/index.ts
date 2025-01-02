import * as fs from 'fs'
import { join } from 'path'
import { EventEmitter } from 'stream'

const rs = fs.createReadStream(join('files', 'style-guide.md'))

rs.on('readable', async () => {
    for await (const chunk of rs)
        console.log(Buffer.alloc(5, chunk))
})