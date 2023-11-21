import { Router } from 'express';
import { Rental, validateRental } from '../models/Rental';
import { Customer } from '../models/Customer';
import { Movie } from '../models/Movie';
import validate from '../middleware/validate';

const router = Router();

router.get('', async (_req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental) return res.status(404).send('Invalid Id.');

  res.send(rental);
});

router.post('', validate(validateRental), async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.')

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.')

  if (movie.numberInStock === 0) return res.status(400).send('Movie not in Stock.');

  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  await Rental.validate(rental);
  await rental.save();
  movie.numberInStock--;
  await movie.save();

  res.send(rental);
  
});

export default router;