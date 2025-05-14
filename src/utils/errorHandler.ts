import { Response } from 'express';

export const handleError = (res: Response, error: unknown, statusCode = 400): void => {
  const message = error instanceof Error ? error.message : 'An unknown error occurred';
  res.status(statusCode).json({ message });
};