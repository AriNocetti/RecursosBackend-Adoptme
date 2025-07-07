import { logger } from '../config/logger.js';
import errorsDictionary from '../dictionary/errors.dictionary.js';

export class CustomError extends Error {
  // errorKey nose si deberia traer este dato en el obj dictionary error
  // in typescript public readonly ... type string


  // @ts-expect-error TS(7006): Parameter 'details' implicitly has an 'any[]' type... Remove this comment to see the full error message
  constructor(dictionaryError: any, details = []) {
    if (!dictionaryError) {
      super('Unknown error, this error is not found in dictionary');
      this.dictionaryError = errorsDictionary.INTERNAL_SERVER_ERROR;
    } else {
      super(dictionaryError.message);
      this.dictionaryError = dictionaryError;
    }
    this.details = details;
  }

  logError() {

    // @ts-expect-error TS(2339): Property 'fatal' does not exist on type 'Logger'.
    logger.fatal(
      this.message,
      this.dictionaryError.code,
      this.dictionaryError.httpStatus,
      this.dictionaryError.isOperational,
      this.details,
    );
  }

  sendResponse(res: any) {
    return res.status(this.dictionaryError.httpStatus).json({
      status: 'error',
      error: {
        code: this.dictionaryError.code,
        message: this.message,
        details: this.details,
      },
    });
  }
}

export const errorHandler = (err: any, req: any, res: any) => {
  if (err instanceof CustomError) {
    err.logError();
    return err.sendResponse(res);
  }

  // Error no manejado
  return res.status(500).json({
    status: 'error',
    error: {
      code: 9001,
      message: 'Error interno del servidor',
    },
  });
};
// class ErrorHandler {
//     public async handleError(error: Er.ror, responseStream: Response): Promise<void> {
//         await logger.logError(error);
//         await fireMonitoringMetric(error);
//         await crashIfUntrustedErrorOrSendResponse(error, responseStream);
//     };
// }

// export const handler = new ErrorHandler();

// Middleware para manejar errores
