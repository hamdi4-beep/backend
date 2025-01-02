import * as fs from 'fs'
import { join } from 'path'
import { EventEmitter, Transform } from 'stream'

const event = new EventEmitter()
const inputs = process.argv.slice(2)

const sources = inputs.map((file, i, arr) =>
    fs.createReadStream(join('files', file))
        .on('error', console.error)
)

for (const src of sources)
    src.on('readable', async () => {
        let chunks = ''
        for await (const chunk of src)
            chunks += chunk
        console.log(chunks)
    })