import mongoose from 'mongoose';

import auth from '../../../../src/middleware/auth';
import { User } from '../../../../src/models/User';

describe('auth middleware', () => {
  it('should populate req.user with the payload of a valid JWT', () => {
    const user = { 
      _id: new mongoose.Types.ObjectId().toHexString(), 
      isAdmin: true 
    };
    const token = new User(user).generateAuthToken();
    const req = {
      header: jest.fn().mockReturnValue(token),
      user: null,
    };
    const res = {};
    const next = jest.fn();

    auth(req as any, res as any, next);

    expect(req.user).toMatchObject(user);
  });
});
