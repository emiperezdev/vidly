import express from 'express';
import genreRouter from '../routes/genres';
import customerRouter from '../routes/customers';
import moviesRouter from '../routes/movies';
import rentalsRouter from '../routes/rentals';
import returnsRouter from '../routes/returns';
import usersRouter from '../routes/users';
import error from '../middleware/error';
import auth from '../routes/auth';

export default function(app: express.Express) {
  app.use(express.json());
  app.use('/api/genres', genreRouter);
  app.use('/api/customers', customerRouter);
  app.use('/api/movies', moviesRouter);
  app.use('/api/rentals', rentalsRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/auth', auth);
  app.use('/api/returns', returnsRouter);

  app.use(error); 
}
