import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from "./routes/mocks.router.js";
import { logger, middLogg } from "./config/logger.js";
import { config } from './config/config.js';
import { errorHandler, CustomError } from './utils/CustomError.js';
import { errorsDictionary } from './dictionary/errors.dictionary.js';

const app = express();
const PORT = config.PORT||8080;
console.log(config.MONGO_DB_URL, 'url')
mongoose.connection.on('connected', () => {
    console.log('✅ Conectado a MongoDB');
    if (logger && logger.info) logger.info('✅ Conectado a MongoDB');
});

mongoose.connection.on('error', (err) => {
    if (logger && logger.grave){
        logger.grave('❌ Error al conectar a MongoDB:', err)
    }
    else {
        console.error('❌ Error al conectar a MongoDB:', err);
    }
});

mongoose.connect(config.MONGO_DB_URL);

app.use(express.json());
app.use(cookieParser());
app.use(middLogg);

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use("/api/mocks", mocksRouter);

app.get("/error-no-controlado", (req, res) => {
    // throw new Error("Este es un error de nannannanana no controlado");

    const error = new CustomError(errorsDictionary.DEPENDENCY_NOT_FOUND, ['no se encontro la dependencia tal', 'tambien ocurrio esto']);
    throw error;
});

app.use(errorHandler);

process.on('unhandledRejection', (reason, p) => {
    logger.grave('unhandledRejection', reason, p);
    // I just caught an unhandled promise rejection,
    // since we already have fallback handler for unhandled errors (see below),
    // let throw and let him handle that
    throw reason;
});

process.on('uncaughtException', (error) => {
    logger.grave('uncaughtException', error);
    //pendiente ver si voy a salir del proceso
    //process.exit(1);

    // I just received an error that was never handled, time to handle it and then decide whether a restart is needed
    // errorManagement.handler.handleError(error);
    // if (!errorManagement.handler.isTrustedError(error))
    //   process.exit(1);
});

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))

