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
const Customer_1 = require("../models/Customer");
const validate_1 = __importDefault(require("../middleware/validate"));
const router = (0, express_1.Router)();
router.get('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield Customer_1.Customer.find();
    res.send(customers);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield Customer_1.Customer.findById(req.params.id);
    if (!customer) {
        res.status(404).send('Invalid Id');
        return;
    }
    res.send(customer);
}));
router.post('', (0, validate_1.default)(Customer_1.validateCustomer), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = new Customer_1.Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });
    try {
        yield customer.validate();
        yield customer.save();
        res.send(customer);
    }
    catch (ex) {
        res.status(500).send(ex.message);
    }
}));
router.put('/:id', (0, validate_1.default)(Customer_1.validateCustomer), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let customer = yield Customer_1.Customer.findById(req.params.id);
    if (!customer) {
        res.status(404).send('Invalid Id');
        return;
    }
    customer = yield Customer_1.Customer.findByIdAndUpdate(req.params.id, {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    }, { new: true });
    res.send(customer);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield Customer_1.Customer.findByIdAndRemove(req.params.id);
    if (!customer) {
        res.status(404).send('Invalid Id');
        return;
    }
    res.send(customer);
}));
exports.default = router;
//# sourceMappingURL=customers.js.map