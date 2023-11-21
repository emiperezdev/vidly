"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const genres_1 = __importDefault(require("../routes/genres"));
const customers_1 = __importDefault(require("../routes/customers"));
const movies_1 = __importDefault(require("../routes/movies"));
const rentals_1 = __importDefault(require("../routes/rentals"));
const returns_1 = __importDefault(require("../routes/returns"));
const users_1 = __importDefault(require("../routes/users"));
const error_1 = __importDefault(require("../middleware/error"));
const auth_1 = __importDefault(require("../routes/auth"));
function default_1(app) {
    app.use(express_1.default.json());
    app.use('/api/genres', genres_1.default);
    app.use('/api/customers', customers_1.default);
    app.use('/api/movies', movies_1.default);
    app.use('/api/rentals', rentals_1.default);
    app.use('/api/users', users_1.default);
    app.use('/api/auth', auth_1.default);
    app.use('/api/returns', returns_1.default);
    app.use(error_1.default);
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map