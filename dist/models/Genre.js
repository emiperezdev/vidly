"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genreSchema = exports.validateGenre = exports.Genre = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const genreSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    }
});
exports.genreSchema = genreSchema;
const Genre = mongoose_1.default.model('Genre', genreSchema);
exports.Genre = Genre;
function validateGenre(genre) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(5).max(50).required()
    });
    return schema.validate(genre);
}
exports.validateGenre = validateGenre;
//# sourceMappingURL=Genre.js.map