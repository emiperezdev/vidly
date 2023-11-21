"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCustomer = exports.Customer = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const customerSchema = new mongoose_1.default.Schema({
    isGold: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 60
    },
    phone: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 10
    }
});
const Customer = mongoose_1.default.model('Customer', customerSchema);
exports.Customer = Customer;
function validateCustomer(customer) {
    const schema = joi_1.default.object({
        isGold: joi_1.default.boolean().required(),
        name: joi_1.default.string().min(3).max(60).required(),
        phone: joi_1.default.string().min(7).max(10).required()
    });
    return schema.validate(customer);
}
exports.validateCustomer = validateCustomer;
//# sourceMappingURL=Customer.js.map