import 'express-async-errors';
import express from 'express';
import routes from './startup/routes';
import initializeDatabase from './startup/db';
import { logger, logging } from './startup/logging';
import config from './startup/config';
import prod from './startup/prod';

logging();
initializeDatabase();
const app = express();
routes(app);
config();
prod(app);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));

export default server;
