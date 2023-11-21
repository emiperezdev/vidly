import server from '../../../../src';
import { Rental } from '../../../../src/models/Rental';
import mongoose from 'mongoose';
import request from 'supertest';
import { User } from '../../../../src/models/User';
import moment from 'moment';
import { Movie } from '../../../../src/models/Movie';

describe('/api/returns', () => {
  let customerId: any;
  let movieId: any;
  let rental: any;
  let token: string;
  let movie: any;

  const exec = () => {
    return request(server)
      .post('/api/returns')
      .set('x-auth-token', token)
      .send({ customerId, movieId });
  };

  beforeEach(async () => { 
    customerId = new mongoose.Types.ObjectId();
    movieId = new mongoose.Types.ObjectId();
    token = new User().generateAuthToken();

    movie = new Movie({
      _id: movieId,
      title: '12345',
      dailyRentalRate: 2,
      genre: { name: '12345' },
      numberInStock: 10
    });
    await movie.save();

    rental = new Rental({
      customer: {
        _id: customerId,
        name: '12345',
        phone: '12345'
      },
      movie: {
        _id: movieId,
        title: '12345',
        dailyRentalRate: 2
      }
    });
    await rental.save();
  });

  afterEach(async () => { 
    server.close();
    await Rental.deleteMany({});
    await Movie.deleteMany({});
  });

  it('should return 401 if client is not logged in.', async () => {
    token = '';

    const res = await exec();

    expect(res.status).toBe(401)
  });

  it('should return 400 if customerId is not provided.', async () => {
    customerId = '';

    const res = await exec();

    expect(res.status).toBe(400)
  });

  it('should return 400 if movieId is not provided.', async () => {
    movieId = '';

    const res = await exec();

    expect(res.status).toBe(400)
  });

  it('should return 404 if no rental found for this customer/movie.', async () => {
    await Rental.deleteMany({});

    const res = await exec();

    expect(res.status).toBe(404)
  });

  it('should return 400 if return is already processed.', async () => {
    rental.dateReturned = new Date();
    await rental.save();

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 200 if we have a valid request.', async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });

  it('should set the return date if input is valid.', async () => {
    const res = await exec();
    let diff: any;
    let date: any;

    date = new Date();
    const rentalInDb: any = await Rental.findById(rental._id)
    diff = date - rentalInDb.dateReturned;
    expect(diff).toBeLessThan(10 * 10000);
  });

  it('should set the rental fee if input is valid.', async () => {
    rental.dateOut = moment().add(-7, 'days').toDate();
    await rental.save();

    const res = await exec();

    const rentalInDb = await Rental.findById(rental._id);
    expect(rentalInDb!.rentalFee).toBe(14);
  });

  // it('should increase the movie stock.', async () => {
  //   const res = await exec();

  //   const movieInDb = await Rental.findById(movieId);
  //   expect(movieInDb).toBe(movie.numberInStock + 1);
  // });

  it('should return the rental if input is valid.', async () => {
    const res = await exec();

    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(['dateOut', 'dateReturned', 'rentalFee', 'customer', 'movie']));
  });
});
