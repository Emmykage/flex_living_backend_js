import { getReasonPhrase, StatusCodes } from 'http-status-codes';

export class ErrorHandler {
  static handle = (err, req, res, next) => {
    const statusCode = err.statusCode ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;

    res
      .status(statusCode)
      .json({ title: getReasonPhrase(statusCode), message: err.message, stackTrace: err.stack });
  };
}
