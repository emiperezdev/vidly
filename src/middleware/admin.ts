import { Response, NextFunction } from 'express';
import CustomRequest from '../routes/dtos/ICustomRequest';

export default function (req: CustomRequest, res: Response, next: NextFunction) {
  if (!req.user.isAdmin) return res.status(403).send('Access denied.');

  next();
}