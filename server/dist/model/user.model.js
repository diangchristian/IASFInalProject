"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'User Name is required'],
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    email: {
        type: String,
        required: [true, 'User Email is required.'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'User Password is required.'],
        minLength: 6,
    },
    salt: {
        type: String,
        required: true
    }
}, { timestamps: true });
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map