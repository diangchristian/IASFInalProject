"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashSHA256 = hashSHA256;
exports.generateSalt = generateSalt;
const crypto_1 = __importDefault(require("crypto"));
function hashSHA256(input, salt) {
    return crypto_1.default.createHash("sha256")
        .update(input + salt)
        .digest("hex");
}
function generateSalt(length = 16) {
    return crypto_1.default.randomBytes(length).toString("hex");
}
const salt = generateSalt();
const hashedPassword = 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f';
console.log('Salt:', salt);
console.log(hashSHA256("password123", salt));
// console.log(hashSHA256("password123") === hashedPassword)
//# sourceMappingURL=hashUtils.js.map