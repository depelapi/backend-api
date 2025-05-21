import { Express } from 'express-serve-static-core';
import User from '../models/user';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        id_jenis_user: string;
      };
      reguDamkarId?: number;
    }
  }
}

export {};
