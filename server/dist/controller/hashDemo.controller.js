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
exports.hashingDemo = void 0;
const hash_model_1 = __importDefault(require("../model/hash.model"));
const hashUtils_1 = require("../utils/hashUtils");
const hashingDemo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { inputs, input } = req.body;
        const rawInputs = Array.isArray(inputs)
            ? inputs
            : typeof input === "string"
                ? [input]
                : null;
        if (!rawInputs || rawInputs.length === 0) {
            return res.status(400).json({ message: "inputs array is required and cannot be empty" });
        }
        const normalizedInputs = rawInputs
            .map((value) => (typeof value === "string" ? value.trim() : ""))
            .filter((value) => value.length > 0);
        if (normalizedInputs.length !== rawInputs.length) {
            return res.status(400).json({ message: "All inputs must be non-empty strings" });
        }
        const hashesToStore = normalizedInputs.map((value) => {
            const salt = (0, hashUtils_1.generateSalt)();
            const hashedOutput = (0, hashUtils_1.hashSHA256)(value, salt);
            return {
                inputPreview: value,
                hashedOutput,
            };
        });
        const storedHashes = yield hash_model_1.default.insertMany(hashesToStore);
        return res.status(200).json({
            message: "Hashing successful",
            count: storedHashes.length,
            hashes: storedHashes,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error occurred while hashing" });
    }
});
exports.hashingDemo = hashingDemo;
//# sourceMappingURL=hashDemo.controller.js.map