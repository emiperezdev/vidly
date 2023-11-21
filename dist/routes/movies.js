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
const Movie_1 = require("../models/Movie");
const Genre_1 = require("../models/Genre");
const validate_1 = __importDefault(require("../middleware/validate"));
const router = (0, express_1.Router)();
router.get('', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movies = yield Movie_1.Movie.find();
    res.send(movies);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = yield Movie_1.Movie.findById(req.params.id);
    if (!movie)
        return res.status(404).send('Invalid Id');
    res.send(movie);
}));
router.post('', (0, validate_1.default)(Movie_1.validateMovie), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const genre = yield Genre_1.Genre.findById(req.body.genreId);
    if (!genre)
        return res.status(404).send('Invalid genre');
    const movie = new Movie_1.Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    try {
        yield movie.validate();
        yield movie.save();
        res.send(movie);
    }
    catch (ex) {
        res.status(500).send(ex.message);
    }
}));
router.put('/:id', (0, validate_1.default)(Movie_1.validateMovie), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const genre = yield Genre_1.Genre.findById(req.body.genreId);
    if (!genre)
        return res.status(400).send('Invalid genre.');
    const movie = yield Movie_1.Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });
    if (!movie)
        return res.status(404).send('The movie with the given ID was not found.');
    res.send(movie);
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = yield Movie_1.Movie.findByIdAndDelete(req.params.id);
    if (!movie)
        return res.status(404).send('Invalid Id.');
    res.send(movie);
}));
exports.default = router;
//# sourceMappingURL=movies.js.map