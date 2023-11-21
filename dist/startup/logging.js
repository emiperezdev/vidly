"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.logging = void 0;
const winston_1 = require("winston");
const winston_mongodb_1 = __importDefault(require("winston-mongodb"));
const mongoDBTransport = new winston_mongodb_1.default.MongoDB({
    db: 'mongodb://localhost/vidly',
    options: { useUnifiedTopology: true },
    collection: 'logs',
});
const logFormat = winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json());
const logger = (0, winston_1.createLogger)({
    format: logFormat,
    transports: [
        new winston_1.transports.File({ filename: 'logfile.log' }),
        new winston_1.transports.Console({ format: winston_1.format.simple() }),
        mongoDBTransport,
    ],
});
exports.logger = logger;
function logging() {
    process.on('uncaughtException', (ex) => {
        logger.error(ex.message, ex);
        process.exit(1);
    });
    process.on('unhandledRejection', (ex) => {
        logger.error(ex.message, ex);
        process.exit(1);
    });
}
exports.logging = logging;
//# sourceMappingURL=logging.js.map