"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logging_1 = require("../startup/logging");
const config_1 = __importDefault(require("config"));
function default_1() {
    const db = config_1.default.get('db');
    mongoose_1.default.connect(db)
        .then(() => logging_1.logger.info(`Connected to ${db}...`));
}
exports.default = default_1;
//# sourceMappingURL=db.js.map