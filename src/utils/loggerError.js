/**
 * Función para lanzar errores relacionados con la configuración del logger
 * Esta función evita la dependencia circular entre logger.js y CustomError.js
 */
function throwLoggerError(errorType, details) {
  const error = new Error();
  error.name = 'LoggerConfigError';
  error.code = errorType.code;
  error.message = errorType.message;
  error.httpStatus = errorType.httpStatus || 500;
  error.details = details;
  throw error;
}

export default throwLoggerError;
