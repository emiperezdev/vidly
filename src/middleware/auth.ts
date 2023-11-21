import jwt from 'jsonwebtoken';
import config from 'config';
import { Response, NextFunction } from 'express';
import CustomRequest from '../routes/dtos/ICustomRequest';

export default function (req: CustomRequest, res: Response, next: NextFunction) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded;
    next();
  }
  catch (ex: any) {
    res.status(400).send('Invalid token.');
  }
}

