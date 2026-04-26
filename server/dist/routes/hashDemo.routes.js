"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hashDemo_controller_1 = require("../controller/hashDemo.controller");
const hashDemoRouter = (0, express_1.Router)();
hashDemoRouter.post("/demo", hashDemo_controller_1.hashingDemo);
exports.default = hashDemoRouter;
//# sourceMappingURL=hashDemo.routes.js.map