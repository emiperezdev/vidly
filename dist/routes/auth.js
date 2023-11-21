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
const express_1 = require("express");
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const joi_1 = __importDefault(require("joi"));
const validate_1 = __importDefault(require("../middleware/validate"));
const router = (0, express_1.Router)();
router.post('', (0, validate_1.default)(validateAuth), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield User_1.User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send('Invalid email.');
    const validPassword = yield bcrypt_1.default.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).send('Invalid password.');
    const token = user.generateAuthToken();
    res.send(token);
}));
function validateAuth(req) {
    const schema = joi_1.default.object({
        email: joi_1.default.string().min(5).max(255).required().email(),
        password: joi_1.default.string().min(5).max(1024).required()
    });
    return schema.validate(req);
}
exports.default = router;
//# sourceMappingURL=auth.js.map