/**
 * Función para lanzar errores relacionados con la configuración del logger
 * Esta función evita la dependencia circular entre logger.js y CustomError.js
 */
function throwLoggerError(errorType: any, details: any) {
  const error = new Error();
  error.name = 'LoggerConfigError';

  // @ts-expect-error TS(2339): Property 'code' does not exist on type 'Error'.
  error.code = errorType.code;
  error.message = errorType.message;

  // @ts-expect-error TS(2339): Property 'httpStatus' does not exist on type 'Erro... Remove this comment to see the full error message
  error.httpStatus = errorType.httpStatus || 500;

  // @ts-expect-error TS(2339): Property 'details' does not exist on type 'Error'.
  error.details = details;
  throw error;
}

export default throwLoggerError;
