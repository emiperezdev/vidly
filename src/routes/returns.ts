import { Request, Response, Router } from 'express';
import { Rental } from '../models/Rental';
import auth from '../middleware/auth';
import Joi from 'joi';
import validate from '../middleware/validate';

const router = Router();

router.post('', [auth, validate(validateReturn)], async (req: Request, res: Response) => {
  const rental = await Rental.findOne({ 
    'customer._id': req.body.customerId, 
    'movie._id': req.body.movieId 
  });

  if (!rental) return res.status(404).send('No rental found.');

  if (rental.dateReturned) return res.status(400).send('Rental is not processed.');

  rental.return();
  rental.save();

  // await Movie.updateOne({ _id:  rental.movie._id }, {
  //   $inc: { numberInStock: 1 }
  // });

  return res.status(200).send(rental);
});

function validateReturn(req: Request) {
  const schema = Joi.object({
    customerId: Joi.string().length(24).hex().required,
    movieId: Joi.string().length(24).hex().required
  });

  return schema.validate(req);
}

export default router;