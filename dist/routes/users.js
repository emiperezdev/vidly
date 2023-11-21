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
const lodash_1 = __importDefault(require("lodash"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = __importDefault(require("../middleware/auth"));
const validate_1 = __importDefault(require("../middleware/validate"));
const router = (0, express_1.Router)();
router.get('/me', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findById(req.user._id).select('-password');
    res.send(user);
}));
router.post('', (0, validate_1.default)(User_1.validateUser), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield User_1.User.findOne({ email: req.body.email });
    if (user)
        return res.status(400).send('User already registered.');
    user = new User_1.User(lodash_1.default.pick(req.body, ['name', 'email', 'password']));
    const salt = yield bcrypt_1.default.genSalt(10);
    user.password = yield bcrypt_1.default.hash(user.password, salt);
    try {
        yield user.validate();
        yield user.save();
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(lodash_1.default.pick(user, ['_id', 'name', 'email']));
    }
    catch (ex) {
        res.send(ex.message);
    }
}));
exports.default = router;
//# sourceMappingURL=users.js.map