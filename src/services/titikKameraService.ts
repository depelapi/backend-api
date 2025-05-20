import TitikKamera from '../models/titikKamera';
import { HttpError } from '../utils/errorHandler';

export interface TitikKameraData {
  nama: string;
  id_device: string;
  latitud: number;
  longitud: number;
  notifikasi_publik?: boolean;
}

export class TitikKameraService {
  public async getAllByUserId(userId: number) {
    return await TitikKamera.findAll({
      where: { id_user: userId }
    });
  }
  
  public async getById(id: number, userId: number) {
    const camera = await TitikKamera.findOne({
      where: { id, id_user: userId }
    });
    
    if (!camera) {
      throw new HttpError('Camera not found or you do not have permission to access it', 404);
    }
    
    return camera;
  }
  
  public async create(data: TitikKameraData, userId: number) {
    try {
      return await TitikKamera.create({
        ...data,
        id_user: userId,
        notifikasi_publik: data.notifikasi_publik || false
      });
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new HttpError('A camera with this name or device ID already exists', 400);
      }
      throw error;
    }
  }
  
  public async update(id: number, data: Partial<TitikKameraData>, userId: number) {
    const camera = await this.getById(id, userId);
    
    try {
      await camera.update(data);
      return camera;
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new HttpError('A camera with this name or device ID already exists', 400);
      }
      throw error;
    }
  }
  
  public async delete(id: number, userId: number) {
    const camera = await this.getById(id, userId);
    await camera.destroy();
    return { message: 'Camera deleted successfully' };
  }
}