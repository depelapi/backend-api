import { Express } from 'express-serve-static-core';
import User from '../models/user';

declare global {
  namespace Express {
    interface Request {
      user?: User; 
    }
  }
}