"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const hashDemo_routes_1 = __importDefault(require("./routes/hashDemo.routes"));
const app = (0, express_1.default)();
app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
    });
    next();
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use('/api/auth', auth_routes_1.default);
app.use('/api/hash', hashDemo_routes_1.default);
exports.default = app;
//# sourceMappingURL=server.js.map