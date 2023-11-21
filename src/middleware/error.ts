import { Request, Response, NextFunction } from 'express';
import { logger } from '../startup/logging';


export default function(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error(err.message, err);
  res.status(500).send('Something failed.');
}