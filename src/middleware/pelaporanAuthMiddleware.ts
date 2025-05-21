import { Request, Response, NextFunction } from 'express';
import Penanganan from '../models/penanganan';
import User from '../models/user';
import { HttpError } from '../utils/errorHandler';

export const authorizeStatusUpdate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pelaporanId = parseInt(req.params.id);
    const userId = parseInt(req.user!.id);

    // Get user's regu_damkar
    const user = await User.findByPk(userId);
    if (!user?.id_regu_damkar) {
      throw new HttpError('User is not part of any regu damkar', 403);
    }

    // Check if user's regu_damkar is handling this pelaporan
    const penanganan = await Penanganan.findOne({
      where: {
        id_pelaporan: pelaporanId,
        id_regu_damkar: user.id_regu_damkar
      }
    });

    if (!penanganan) {
      throw new HttpError('Your team is not assigned to handle this report', 403);
    }

    // Store regu_damkar info in request for later use
    req.reguDamkarId = user.id_regu_damkar;
    next();
  } catch (error) {
    next(error);
  }
};