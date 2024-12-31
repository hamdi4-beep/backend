import * as crypto from 'crypto'

const key = Buffer.alloc(32)
const iv = crypto.randomBytes(16)

// encryption

const encrypt = (data: string) => {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
    return cipher.update(data, 'utf-8', 'hex') + cipher.final('hex')
}

// decryption

const decrypt = (cipherText: string) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
    return decipher.update(cipherText, 'hex', 'utf-8') + decipher.final('utf-8')
}

const decrypted = decrypt(encrypt('Sensitive information'))
console.log(decrypted)