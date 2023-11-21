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
const validateObjectid_1 = __importDefault(require("../middleware/validateObjectid"));
const express_1 = require("express");
const Genre_1 = require("../models/Genre");
const Genre_2 = require("../models/Genre");
const auth_1 = __importDefault(require("../middleware/auth"));
const admin_1 = __importDefault(require("../middleware/admin"));
const validate_1 = __importDefault(require("../middleware/validate"));
const router = (0, express_1.Router)();
router.get('', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const genres = yield Genre_1.Genre.find().sort('name');
    res.send(genres);
}));
router.get('/:id', validateObjectid_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const genre = yield Genre_1.Genre.findById(req.params.id);
    if (!genre) {
        res.status(404).send('Invalid Id');
        return;
    }
    res.send(genre);
}));
router.post('', [auth_1.default, (0, validate_1.default)(Genre_2.validateGenre)], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, Genre_2.validateGenre)(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const genre = new Genre_1.Genre(req.body);
    yield Genre_1.Genre.validate(genre);
    yield genre.save();
    res.send(genre);
}));
router.put('/:id', (0, validate_1.default)(Genre_2.validateGenre), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, Genre_2.validateGenre)(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    let genre = yield Genre_1.Genre.findById(req.params.id);
    if (!genre) {
        res.status(404).send('Invalid Id');
        return;
    }
    genre = yield Genre_1.Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, { new: true });
    res.send(genre);
}));
router.delete('/:id', [auth_1.default, admin_1.default], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const genre = yield Genre_1.Genre.findByIdAndRemove(req.params.id);
    if (!genre) {
        res.status(404).send('Invalid Id');
    }
    res.send(genre);
}));
exports.default = router;
//# sourceMappingURL=genres.js.map