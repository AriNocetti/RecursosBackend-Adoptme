import 'dotenv/config';

// @ts-expect-error TS(7016): Could not find a declaration file for module 'cook... Remove this comment to see the full error message
import cookieParser from 'cookie-parser';

// @ts-expect-error TS(7016): Could not find a declaration file for module 'expr... Remove this comment to see the full error message
import express from 'express';
import mongoose from 'mongoose';

// @ts-expect-error TS(7016): Could not find a declaration file for module 'swag... Remove this comment to see the full error message
import swaggerUi from 'swagger-ui-express';

import config from './config/config.js';
import { logger, middLogg } from './config/logger.js';
import swaggerDocs from './config/swagger.js';
import adoptionsRouter from './routes/adoption.router.js';
import mocksRouter from './routes/mocks.router.js';
import petsRouter from './routes/pets.router.js';
import sessionsRouter from './routes/sessions.router.js';
import usersRouter from './routes/users.router.js';
import { errorHandler } from './utils/CustomError.js';

const app = express();
mongoose.connection.on('connected', () => {
  if (logger && logger.info) logger.info('✅ Conectado a MongoDB.');
});

mongoose.connection.on('error', err => {

  // @ts-expect-error TS(2339): Property 'fatal' does not exist on type 'Logger'.
  if (logger && logger.fatal) {

    // @ts-expect-error TS(2339): Property 'fatal' does not exist on type 'Logger'.
    logger.fatal('❌ Error al conectar a MongoDB:', err);
  } else {
    console.error('❌ Error al conectar a MongoDB:', err);
  }
});

mongoose.connect(config.MONGO_DB_URL);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use(cookieParser());
app.use(middLogg);

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);

app.get('/loggerTest', (req: any, res: any) => {
  req.logger.debug('Debug log test');
  req.logger.http('HTTP log test');
  req.logger.info('Info log test');
  req.logger.warning('Warning log test');
  req.logger.error('Error log test');
  req.logger.fatal('Fatal log test');
  res.send('Logger test completed. Check your console and errors.log file.');
});

// app.get("/error-no-controlado", (req, res) => {
//     const error = new CustomError(errorsDictionary.DEPENDENCY_NOT_FOUND,
// ['no se encontro la dependencia tal', 'tambien ocurrio esto']);
//     throw error;
// });

app.use(errorHandler);

process.on('unhandledRejection', (reason, p) => {

  // @ts-expect-error TS(2339): Property 'fatal' does not exist on type 'Logger'.
  logger.fatal('unhandledRejection', reason, p);
  // I just caught an unhandled promise rejection,
  // since we already have fallback handler for unhandled errors (see below),
  // let throw and let him handle that
  throw reason;
});

process.on('uncaughtException', error => {

  // @ts-expect-error TS(2339): Property 'fatal' does not exist on type 'Logger'.
  logger.fatal('uncaughtException', error);
  // pendiente ver si voy a salir del proceso
  // process.exit(1);

  // I just received an error that was never handled,
  // time to handle it and then decide whether a restart is needed
  // errorManagement.handler.handleError(error);
  // if (!errorManagement.handler.isTrustedError(error))
  //   process.exit(1);
});

// La inicialización del servidor se ha movido a server.js

export default app;
