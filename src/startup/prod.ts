import helmet from 'helmet';
import compression from 'compression';
import { Express } from 'express';

export default function(app: Express) {
  app.use(helmet());
  app.use(compression());
}