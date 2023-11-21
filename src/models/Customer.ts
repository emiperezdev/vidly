import mongoose from 'mongoose';
import Joi from 'joi';
import ICustomer from '../routes/dtos/ICustomer';
import Customer from '../routes/dtos/ICustomer';

const customerSchema = new mongoose.Schema({
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
})

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer: ICustomer) {
  const schema = Joi.object({
    isGold: Joi.boolean().required(),
    name: Joi.string().min(3).max(60).required(),
    phone: Joi.string().min(7).max(10).required()
  })
  
  return schema.validate(customer);
}

export { Customer, validateCustomer };