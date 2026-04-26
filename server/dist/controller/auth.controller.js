"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const hashUtils_1 = require("../utils/hashUtils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const SECRET = env_1.JWT_SECRET || "";
const EXPIRES_IN = (env_1.JWT_EXPIRES_IN !== null && env_1.JWT_EXPIRES_IN !== void 0 ? env_1.JWT_EXPIRES_IN : "1h");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }
        if (!env_1.JWT_SECRET) {
            return res.status(500).json({ message: "JWT secret is not configured." });
        }
        const isExistingUser = yield user_model_1.default.findOne({ email });
        if (isExistingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }
        // Hashing Logic
        const salt = (0, hashUtils_1.generateSalt)();
        const hashedPassword = (0, hashUtils_1.hashSHA256)(password, salt);
        const newUsers = yield user_model_1.default.create([{ name, email, password: hashedPassword, salt }], { session });
        const token = jsonwebtoken_1.default.sign({ userId: newUsers[0]._id }, SECRET, { expiresIn: EXPIRES_IN });
        yield session.commitTransaction();
        res.status(201).json({ message: "User created successfully.", user: newUsers[0], token });
    }
    catch (error) {
        yield session.abortTransaction();
        res.status(500).json({ message: "Error occurred while creating user." });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }
        if (!env_1.JWT_SECRET) {
            return res.status(500).json({ message: "JWT secret is not configured." });
        }
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const hashedInputPassword = (0, hashUtils_1.hashSHA256)(password, user.salt);
        if (hashedInputPassword !== user.password) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, SECRET, { expiresIn: EXPIRES_IN });
        res.status(201).json({ message: "User signed in successfully.", user, token });
    }
    catch (error) {
        res.status(500).json({ message: "Error occurred while creating user." });
    }
});
exports.signIn = signIn;
//# sourceMappingURL=auth.controller.js.map