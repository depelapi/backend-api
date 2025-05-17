import { Response } from 'express';

export class HttpError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const sendErrorResponse = (res: Response, error: unknown, defaultStatus = 400): void => {
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }
  
  const message = error instanceof Error ? error.message : 'An unknown error occurred';
  res.status(defaultStatus).json({ message });
};