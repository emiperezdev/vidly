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
const auth_1 = __importDefault(require("../middleware/auth"));
const moment_1 = __importDefault(require("moment"));
const joi_1 = __importDefault(require("joi"));
const validate_1 = __importDefault(require("../middleware/validate"));
const router = (0, express_1.Router)();
router.post('', [auth_1.default, (0, validate_1.default)(validateReturn)], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rental = yield Rental_1.Rental.findOne({
        'customer._id': req.body.customerId,
        'movie._id': req.body.movieId
    });
    if (!rental)
        return res.status(404).send('No rental found.');
    if (rental.dateReturned)
        return res.status(400).send('Rental is not processed.');
    rental.dateReturned = new Date();
    const rentalDays = (0, moment_1.default)().diff(rental.dateOut, 'days');
    rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;
    rental.save();
    // await Movie.updateOne({ _id:  rental.movie._id }, {
    //   $inc: { numberInStock: 1 }
    // });
    return res.status(200).send(rental);
}));
function validateReturn(req) {
    const schema = joi_1.default.object({
        customerId: joi_1.default.string().length(24).hex().required,
        movieId: joi_1.default.string().length(24).hex().required
    });
    return schema.validate(req);
}
exports.default = router;
//# sourceMappingURL=returns.js.map