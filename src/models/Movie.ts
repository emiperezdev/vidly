import mongoose from 'mongoose';
import { genreSchema } from './Genre';
import Joi from 'joi';
import IMovie from '../routes/dtos/IMovie';

const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  genre: {
    type: genreSchema,
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

const Movie = mongoose.model('Movie', moviesSchema);

function validateMovie(movie: IMovie) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    genreId: Joi.string().length(24).hex().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required()
  });

  return schema.validate(movie);
}

export { Movie, validateMovie };
