import mongoose from 'mongoose';
import Joi from 'joi';
import IGenre from '../routes/dtos/IGenre';

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true
  }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre: IGenre) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required()
  });

  return schema.validate(genre);
}

export { Genre, validateGenre, genreSchema };