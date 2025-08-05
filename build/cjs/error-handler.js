"use strict";

exports.__esModule = true;
exports.TooManyRequestsError = exports.ServiceUnavailableError = exports.NotFoundError = exports.NotAuthorizedError = exports.InternalServerError = exports.ForbiddenError = exports.FileTooLargeError = exports.CustomError = exports.ConflictError = exports.BadRequestError = void 0;
var _httpStatusCodes = require("http-status-codes");
class CustomError extends Error {
  constructor(message, statusCode, comingFrom = 'Unknown') {
    super(message);
    this.statusCode = void 0;
    this.statusText = void 0;
    this.comingFrom = void 0;
    this.statusCode = statusCode;
    this.statusText = (0, _httpStatusCodes.getReasonPhrase)(statusCode);
    this.comingFrom = comingFrom;

    // Ensures the custom error class maintains the correct prototype chain
    // when compiled/transpiled from TypeScript to JavaScript, especially when extending built-in classes like Error.
    Object.setPrototypeOf(this, new.target.prototype);
  }
  serializedError() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      statusText: this.statusText,
      comingFrom: this.comingFrom
    };
  }
}
exports.CustomError = CustomError;
class BadRequestError extends CustomError {
  constructor(message, comingFrom) {
    super(message, _httpStatusCodes.StatusCodes.BAD_REQUEST, comingFrom);
  }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends CustomError {
  constructor(message, comingFrom) {
    super(message, _httpStatusCodes.StatusCodes.NOT_FOUND, comingFrom);
  }
}
exports.NotFoundError = NotFoundError;
class NotAuthorizedError extends CustomError {
  constructor(message, comingFrom) {
    super(message, _httpStatusCodes.StatusCodes.UNAUTHORIZED, comingFrom);
  }
}
exports.NotAuthorizedError = NotAuthorizedError;
class FileTooLargeError extends CustomError {
  constructor(message, comingFrom) {
    super(message, _httpStatusCodes.StatusCodes.REQUEST_TOO_LONG, comingFrom);
  }
}
exports.FileTooLargeError = FileTooLargeError;
class InternalServerError extends CustomError {
  constructor(message, comingFrom) {
    super(message, _httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, comingFrom);
  }
}
exports.InternalServerError = InternalServerError;
class ServiceUnavailableError extends CustomError {
  constructor(message, comingFrom) {
    super(message, _httpStatusCodes.StatusCodes.SERVICE_UNAVAILABLE, comingFrom);
  }
}
exports.ServiceUnavailableError = ServiceUnavailableError;
class ConflictError extends CustomError {
  constructor(message, comingFrom) {
    super(message, _httpStatusCodes.StatusCodes.CONFLICT, comingFrom);
  }
}
exports.ConflictError = ConflictError;
class ForbiddenError extends CustomError {
  constructor(message, comingFrom) {
    super(message, _httpStatusCodes.StatusCodes.FORBIDDEN, comingFrom);
  }
}
exports.ForbiddenError = ForbiddenError;
class TooManyRequestsError extends CustomError {
  constructor(message, comingFrom) {
    super(message, _httpStatusCodes.StatusCodes.TOO_MANY_REQUESTS, comingFrom);
  }
}
exports.TooManyRequestsError = TooManyRequestsError;
//# sourceMappingURL=error-handler.js.map