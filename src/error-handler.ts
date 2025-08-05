import { StatusCodes, getReasonPhrase } from 'http-status-codes';

export interface IErrorResponse {
  message: string;
  statusCode: number;
  statusText: string;
  comingFrom: string;
  serializedError(): IError;
}
export interface IError {
  message: string;
  statusCode: number;
  statusText: string;
  comingFrom: string;
}

export interface ErrorNumberException extends Error {
  errorNumber?: number;
  errorCode?: string;
  path?: string;
  syscall?: string;
  stack?: string;
}

export abstract class CustomError extends Error implements IErrorResponse {
  public statusCode: number;
  public statusText: string;
  public comingFrom: string;

  constructor(message: string, statusCode: number, comingFrom = 'Unknown') {
    super(message);
    this.statusCode = statusCode;
    this.statusText = getReasonPhrase(statusCode);
    this.comingFrom = comingFrom;

    // Ensures the custom error class maintains the correct prototype chain
    // when compiled/transpiled from TypeScript to JavaScript, especially when extending built-in classes like Error.
    Object.setPrototypeOf(this, new.target.prototype);
  }

  serializedError(): IError {
    return {
      message: this.message,
      statusCode: this.statusCode,
      statusText: this.statusText,
      comingFrom: this.comingFrom,
    };
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string, comingFrom: string) {
    super(message, StatusCodes.BAD_REQUEST, comingFrom);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string, comingFrom: string) {
    super(message, StatusCodes.NOT_FOUND, comingFrom);
  }
}

export class NotAuthorizedError extends CustomError {
  constructor(message: string, comingFrom: string) {
    super(message, StatusCodes.UNAUTHORIZED, comingFrom);
  }
}

export class FileTooLargeError extends CustomError {
  constructor(message: string, comingFrom: string) {
    super(message, StatusCodes.REQUEST_TOO_LONG, comingFrom);
  }
}

export class InternalServerError extends CustomError {
  constructor(message: string, comingFrom: string) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR, comingFrom);
  }
}

export class ServiceUnavailableError extends CustomError {
  constructor(message: string, comingFrom: string) {
    super(message, StatusCodes.SERVICE_UNAVAILABLE, comingFrom);
  }
}

export class ConflictError extends CustomError {
  constructor(message: string, comingFrom: string) {
    super(message, StatusCodes.CONFLICT, comingFrom);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string, comingFrom: string) {
    super(message, StatusCodes.FORBIDDEN, comingFrom);
  }
}

export class TooManyRequestsError extends CustomError {
  constructor(message: string, comingFrom: string) {
    super(message, StatusCodes.TOO_MANY_REQUESTS, comingFrom);
  }
}
