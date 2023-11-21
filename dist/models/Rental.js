"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRental = exports.Rental = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const rentalSchema = new mongoose_1.default.Schema({
    customer: {
        type: new mongoose_1.default.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        }),
        required: true,
    },
    movie: {
        type: new mongoose_1.default.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});
const Rental = mongoose_1.default.model('Rental', rentalSchema);
exports.Rental = Rental;
function validateRental(rental) {
    const schema = joi_1.default.object({
        customerId: joi_1.default.string().min(24).hex().required(),
        movieId: joi_1.default.string().min(24).hex().required()
    });
    return schema.validate(rental);
}
exports.validateRental = validateRental;
//# sourceMappingURL=Rental.js.map