"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = require("../startup/logging");
function default_1(err, req, res, next) {
    logging_1.logger.error(err.message, err);
    res.status(500).send('Something failed.');
}
exports.default = default_1;
//# sourceMappingURL=error.js.map