import { Router } from 'express';
import { Movie, validateMovie } from '../models/Movie';
import { Genre } from '../models/Genre';
import validate from '../middleware/validate';

const router = Router();

router.get('', async (_req, res) => {
  const movies = await Movie.find();
  res.send(movies);
})

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) return res.status(404).send('Invalid Id');

  res.send(movie);
});

router.post('', validate(validateMovie), async (req, res) => {
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(404).send('Invalid genre');

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });

  try {
    await movie.validate();
    await movie.save();
    res.send(movie);
  }
  catch (ex: any) {
    res.status(500).send(ex.message)
  }
});

router.put('/:id', validate(validateMovie), async (req, res) => {
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const movie = await Movie.findByIdAndUpdate(req.params.id,
    { 
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) return res.status(404).send('Invalid Id.');

  res.send(movie);
});

export default router;