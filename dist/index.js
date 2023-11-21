"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./startup/routes"));
const db_1 = __importDefault(require("./startup/db"));
const logging_1 = require("./startup/logging");
const config_1 = __importDefault(require("./startup/config"));
(0, logging_1.logging)();
(0, db_1.default)();
const app = (0, express_1.default)();
(0, routes_1.default)(app);
(0, config_1.default)();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => logging_1.logger.info(`Listening on port ${PORT}`));
exports.default = server;
//# sourceMappingURL=index.js.map