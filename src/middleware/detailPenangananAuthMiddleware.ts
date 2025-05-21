import { Request, Response, NextFunction } from 'express';
import Penanganan from '../models/penanganan';
import DetailPenanganan from '../models/detailPenanganan';
import User from '../models/user';
import { HttpError } from '../utils/errorHandler';

export const authorizeReguDamkarMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.user!.id);
    let penangananId: number | null = null;
    
    // Use either detail_penanganan or penangananId
    if (req.params.penangananId) {
      penangananId = parseInt(req.params.penangananId);
    } 
    else if (req.params.id) {
      const detailId = parseInt(req.params.id);
      const detailPenanganan = await DetailPenanganan.findByPk(detailId);
      if (!detailPenanganan) {
        throw new HttpError('Detail penanganan not found', 404);
      }
      penangananId = detailPenanganan.id_penanganan;
    }
    
    if (!penangananId) {
      throw new HttpError('Penanganan ID not found in request', 400);
    }
    
    const user = await User.findByPk(userId);
    if (!user?.id_regu_damkar) {
      throw new HttpError('User is not part of any regu damkar', 403);
    }

    const penanganan = await Penanganan.findOne({
      where: {
        id: penangananId,
        id_regu_damkar: user.id_regu_damkar
      }
    });

    if (!penanganan) {
      throw new HttpError('Your team is not assigned to handle this penanganan', 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};