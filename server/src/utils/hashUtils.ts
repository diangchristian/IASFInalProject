import crypto from 'crypto'

export function hashSHA256(input: string, salt: string): string {
    
    return crypto.createHash("sha256")
    .update(input + salt)
    .digest("hex");
    
}

export function generateSalt(length: number = 16): string {
    return crypto.randomBytes(length).toString("hex");
}


const salt = generateSalt()
const hashedPassword = 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f'


console.log('Salt:', salt)
console.log(hashSHA256("password123", salt))

// console.log(hashSHA256("password123") === hashedPassword)