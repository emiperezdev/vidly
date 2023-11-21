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
const Rental_1 = require("../models/Rental");
const Customer_1 = require("../models/Customer");
const Movie_1 = require("../models/Movie");
const validate_1 = __importDefault(require("../middleware/validate"));
const router = (0, express_1.Router)();
router.get('', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rentals = yield Rental_1.Rental.find().sort('-dateOut');
    res.send(rentals);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rental = yield Rental_1.Rental.findById(req.params.id);
    if (!rental)
        return res.status(404).send('Invalid Id.');
    res.send(rental);
}));
router.post('', (0, validate_1.default)(Rental_1.validateRental), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, Rental_1.validateRental)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const customer = yield Customer_1.Customer.findById(req.body.customerId);
    if (!customer)
        return res.status(400).send('Invalid customer.');
    const movie = yield Movie_1.Movie.findById(req.body.movieId);
    if (!movie)
        return res.status(400).send('Invalid movie.');
    if (movie.numberInStock === 0)
        return res.status(400).send('Movie not in Stock.');
    const rental = new Rental_1.Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    yield Rental_1.Rental.validate(rental);
    yield rental.save();
    movie.numberInStock--;
    yield movie.save();
    res.send(rental);
}));
exports.default = router;
//# sourceMappingURL=rentals.js.map