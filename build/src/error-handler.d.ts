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
export declare abstract class CustomError extends Error implements IErrorResponse {
    statusCode: number;
    statusText: string;
    comingFrom: string;
    constructor(message: string, statusCode: number, comingFrom?: string);
    serializedError(): IError;
}
export declare class BadRequestError extends CustomError {
    constructor(message: string, comingFrom: string);
}
export declare class NotFoundError extends CustomError {
    constructor(message: string, comingFrom: string);
}
export declare class NotAuthorizedError extends CustomError {
    constructor(message: string, comingFrom: string);
}
export declare class FileTooLargeError extends CustomError {
    constructor(message: string, comingFrom: string);
}
export declare class InternalServerError extends CustomError {
    constructor(message: string, comingFrom: string);
}
export declare class ServiceUnavailableError extends CustomError {
    constructor(message: string, comingFrom: string);
}
export declare class ConflictError extends CustomError {
    constructor(message: string, comingFrom: string);
}
export declare class ForbiddenError extends CustomError {
    constructor(message: string, comingFrom: string);
}
export declare class TooManyRequestsError extends CustomError {
    constructor(message: string, comingFrom: string);
}
