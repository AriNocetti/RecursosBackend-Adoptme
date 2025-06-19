// Importaciones necesarias - Winston
import winston from "winston";
import { config } from "./config.js";
import { CustomError } from "../utils/CustomError.js";
import { errorsDictionary } from "../dictionary/errors.dictionary.js";

// Definición de niveles personalizados y colores para los logs
const nivelesPersonalizados = { 
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        debug: 'cyan',
        http: 'magenta',
        info: 'blue',
        warning: 'yellow',
        error: 'red',
        fatal: 'bgRed'
    }
};

// Registrar colores personalizados en Winston
winston.addColors(nivelesPersonalizados.colors);

// Transporte para consola (solo en desarrollo)
const transportConsoleDev = new winston.transports.Console({
    level: "debug",
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
});

const transportConsoleProd = new winston.transports.Console({
    level: "info",
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
});

// Transporte para archivo (solo errores)
const transportFile = new winston.transports.File({
    level: "error", // solo se van a guardar en archivo los logger.error y fatal
    filename: "./src/logs/errors.log",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
});

//* Crear instancia del -> logger <-
export const logger = winston.createLogger({
    levels: nivelesPersonalizados.levels,
    transports: [transportFile],
});

if (config.MODE === "DEV") {
    logger.add(transportConsoleDev);
    logger.debug("Logger initialized in DEV mode on port: " + config.PORT);
} else if (config.MODE === "PROD") {
    logger.add(transportConsoleProd);
    logger.info("Logger initialized in PROD mode on port: " + config.PORT);
} else {
    throw CustomError(errorsDictionary.INVALID_CONFIG, ["La variable de entorno MODE: " + config.MODE + " es invalida para configurar el logger"]);
}

//* Middleware para inyectar el logger en cada request
export const middLogg = (req, res, next) => {
    req.logger = logger;
    next();
};