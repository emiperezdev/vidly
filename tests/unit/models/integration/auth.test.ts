import request from 'supertest';
import server from '../../../../src/index';
import { User } from '../../../../src/models/User';
import { Genre } from '../../../../src/models/Genre';

describe('auth middleware', () => {
  beforeEach(() => { server });
  afterEach(async () => { 
    await Genre.deleteMany({});
    server.close();
   });

  let token: string;

  const exe = () => {
    return request(server)
      .post('/api/genres')
      .set('x-auth-token', token)
      .send({ name: 'genre1' });
  };

  beforeEach(() => {
    token = new User().generateAuthToken();
  });

  it('should return 401 if no token is provided.', async () => {
    token = '';
    
    const res = await exe();

    expect(res.status).toBe(401);
  });

  it('should return 400 if token is invalid.', async () => {
    token = 'a';
    
    const res = await exe();

    expect(res.status).toBe(400);
  });

  it('should return 200 if token is valid.', async () => {
    const res = await exe();

    expect(res.status).toBe(200);
  });
});