import { Request, Response, NextFunction } from 'express';
import TitikKamera from '../models/titikKamera';

// Allow only pemilik lahan to access routes
export const authorizeOwnerOnly = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.id_jenis_user !== '3') {
    return res.status(403).json({
      message: 'Access denied. Only land Pemilik Lahan can perform this operation.'
    });
  }
  
  next();
};

// Allow only the camera(s) owner to acess routes
export const authorizeOwnerOfCamera = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cameraId = parseInt(req.params.id);
    const userId = req.user!.id;
    
    if (!req.user || req.user.id_jenis_user !== '3') {
      return res.status(403).json({
        message: 'Access denied. Only land Pemilik Lahan can perform this operation.'
      });
    }
    
    const camera = await TitikKamera.findByPk(cameraId);
    
    if (!camera) {
      return res.status(404).json({ message: 'Camera not found' });
    }
    
    if (camera.id_user !== parseInt(userId)) {
      return res.status(403).json({ 
        message: 'Access denied. You can only manage your own cameras.' 
      });
    }
    
    next();
  } catch (error) {
    console.error('Error in camera authorization:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};