import { createReadStream } from 'fs'
import * as net from 'net'
import { join } from 'path'
import * as readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const socket = net.connect(3000, 'localhost', () => {
    sendMessage()
})

function sendMessage() {
    rl.question('Your Message: ', msg => {
        socket.write(msg)
        sendMessage()
    })
}