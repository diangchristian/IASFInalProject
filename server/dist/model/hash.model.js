"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const hashSchema = new mongoose_1.default.Schema({
    inputPreview: {
        type: String,
        required: [true, 'Input preview is required.'],
    },
    hashedOutput: {
        type: String,
        required: [true, 'Hashed output is required.']
    },
});
exports.default = mongoose_1.default.model('Hash', hashSchema);
//# sourceMappingURL=hash.model.js.map