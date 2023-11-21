import mongoose from 'mongoose';
import Joi from 'joi';
import IRental from '../routes/dtos/IRental';
import moment from 'moment';

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
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
    type: new mongoose.Schema({
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

rentalSchema.methods.return = function() {
  this.dateReturned = new Date();

  const rentalDays: number = moment().diff(this.dateOut, 'days');
  this.rentalFee = rentalDays * this.movie.dailyRentalRate;
}

declare module 'mongoose' {
  interface Document {
    return: () => any
  }
}

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental: IRental) {
  const schema = Joi.object({
    customerId: Joi.string().min(24).hex().required(),
    movieId: Joi.string().min(24).hex().required()
  });

  return schema.validate(rental);
}

export { Rental, validateRental };

