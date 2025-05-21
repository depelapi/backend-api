import { Express } from 'express-serve-static-core';
import User from '../models/user';

export {};

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        id_jenis_user: string;
        id_regu_damkar?: string;
      };
      // reguDamkarId?: number;
    }
  }
}
