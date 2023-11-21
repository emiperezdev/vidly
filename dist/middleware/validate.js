"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(validator) {
    return (req, res, next) => {
        const { error } = validator(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);
        next();
    };
}
exports.default = default_1;
//# sourceMappingURL=validate.js.map