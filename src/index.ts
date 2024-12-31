import { Cipher, createCipheriv, createDecipheriv, randomBytes, randomFill, scrypt } from 'crypto'
import { createReadStream, readFile } from 'fs'
import { join } from 'path'

const createList = (n: number, i = 1, num = ''): string[] =>
    i <= n ? createList(n, i + 1, num += i !== 1 ? `.${i}` : i) : num.split('.')

const results = []
const divideBy = 4

const list = createList(20)

for (let i = 1, prev; i <= divideBy; i++) {
    const chunks = []

    for (let j = prev ?? 0; j < (prev = Math.round(list.length / divideBy) * i); j++)
        chunks.push(j + 1)

    results.push(chunks)
}

console.log(results)