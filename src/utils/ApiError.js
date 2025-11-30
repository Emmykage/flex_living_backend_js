import { StatusCodes } from 'http-status-codes';

export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);

    this.statusCode = statusCode;
    console.log('[Check error]: ', statusCode, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(path) {
    super(StatusCodes.NOT_FOUND, `Not found path: ${path} found`);
  }
}

export class BadRequestError extends ApiError {
  constructor(message) {
    super(StatusCodes.BAD_REQUEST, message);
  }
}
