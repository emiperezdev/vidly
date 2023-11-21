import validateObjectid from '../middleware/validateObjectid';
import { Router, Request, Response } from 'express';
import { Genre } from '../models/Genre';
import { validateGenre } from '../models/Genre';
import auth from '../middleware/auth';
import admin from '../middleware/admin';
import validate from '../middleware/validate';

const router = Router();

router.get('', async (_req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.get('/:id', validateObjectid, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    res.status(404).send('Invalid Id');
    return;
  }

  res.send(genre);
});

router.post('', [auth, validate(validateGenre)], async (req: Request, res: Response) => {
  const { error } = validateGenre(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const genre = new Genre(req.body);
  await Genre.validate(genre);
  await genre.save();

  res.send(genre);
});

router.put('/:id', validate(validateGenre), async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let genre = await Genre.findById(req.params.id)
  if (!genre) {
    res.status(404).send('Invalid Id');
    return;
  }

  genre = await Genre.findByIdAndUpdate(req.params.id, {
    name: req.body.name
  }, { new: true });

  res.send(genre);
});

router.delete('/:id', [auth, admin], async (req: Request, res: Response) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) {
    res.status(404).send('Invalid Id');
  }

  res.send(genre);
});

export default router;