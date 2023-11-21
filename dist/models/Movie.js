"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMovie = exports.Movie = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Genre_1 = require("./Genre");
const joi_1 = __importDefault(require("joi"));
const moviesSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: Genre_1.genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        min: 0,
        max: 255,
        required: true
    }
});
const Movie = mongoose_1.default.model('Movie', moviesSchema);
exports.Movie = Movie;
function validateMovie(movie) {
    const schema = joi_1.default.object({
        title: joi_1.default.string().min(5).max(255).required(),
        genreId: joi_1.default.string().length(24).hex().required(),
        numberInStock: joi_1.default.number().min(0).required(),
        dailyRentalRate: joi_1.default.number().min(0).required()
    });
    return schema.validate(movie);
}
exports.validateMovie = validateMovie;
//# sourceMappingURL=Movie.js.map