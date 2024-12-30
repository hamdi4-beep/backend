import { createReadStream, createWriteStream } from 'fs'
import axios from 'axios'
import { join } from 'path'
import { Readable } from 'stream'
import { readFile } from 'fs/promises'

const gen = generateSequence(Array.from({ length: 8 }, (_, i) => i + 1))

console.log(gen.next())
console.log(gen.next())
console.log(gen.next())

function* generateSequence(arr: any[]) {
    let i = 0

    while (i < 3) {
        const items = createPartition(arr, 3)
        yield items[i++]
    }
}

function createPartition(items: any[], divideBy: number) {
    const results = []
    let prev

    for (let i = 1; i <= divideBy; i++) {
        const chunks = []

        for (let j = prev ?? 0; j < (prev = Math.round(items.length / divideBy) * i); j++)
            chunks.push(items[j])
        
        results.push(chunks.filter(Boolean))
    }

    return results
}