import { Op } from 'sequelize';
import sequelize from '../config/database';
import Pelaporan from '../models/pelaporan';
import TitikKamera from '../models/titikKamera';
import StatusKebakaran from '../models/statusKebakaran';
import User from '../models/user';
import GambarPelaporan from '../models/gambarPelaporan';
import { HttpError } from '../utils/errorHandler';
import Penanganan from '../models/penanganan';

export interface PelaporanData {
  judul: string;
  deskripsi: string;
  latitud: number;
  longitud: number;
  akun_socmed?: string;
  gambar?: string[];
}

export class PelaporanService {
  public async getAll(filters?: {
    recent?: boolean;
    older?: boolean;
    titikKameraIds?: number[];
    statusId?: number;
    proximity?: { lat: number; lng: number; radius?: number };
  }) {
    const where: any = {};
    const include = [
      { model: User, as: 'User' },
      { model: TitikKamera, as: 'TitikKamera' },
      { model: StatusKebakaran, as: 'StatusKebakaran' },
      { model: GambarPelaporan, as: 'GambarPelaporan' }
    ];
    
    // Filter by time
    if (filters?.recent) {
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      
      where.diperbarui_pada = {
        [Op.gte]: oneDayAgo
      };
    } else if (filters?.older) {
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      
      where.diperbarui_pada = {
        [Op.lt]: oneDayAgo
      };
    }
    
    // Filter by titik_kamera
    if (filters?.titikKameraIds && filters.titikKameraIds.length > 0) {
      where.id_titik_kamera = {
        [Op.in]: filters.titikKameraIds
      };
    }
    
    // Filter by id_status_kebakaran
    if (filters?.statusId) {
      where.id_status_kebakaran = filters.statusId;
    }
    
    // Filter by proximity (50m radius)
    if (filters?.proximity) {
      const { lat, lng, radius = 50 } = filters.proximity;
      
      const allPelaporan = await Pelaporan.findAll({
        attributes: ['id', 'latitud', 'longitud']
      });
      
      const withinRadiusIds = allPelaporan
        .filter(p => {
          const distance = this.calculateDistance(
            lat, 
            lng, 
            Number(p.latitud), 
            Number(p.longitud)
          );
          return distance <= radius;
        })
        .map(p => p.id);
      
      if (withinRadiusIds.length > 0) {
        where.id = {
          [Op.in]: withinRadiusIds
        };
      } else {
        return [];
      }
    }
    
    return await Pelaporan.findAll({
      where,
      include,
      order: [['diperbarui_pada', 'DESC']]
    });
  }
  
  public async getById(id: number) {
    const pelaporan = await Pelaporan.findByPk(id, {
      include: [
        { model: User, as: 'User' },
        { model: TitikKamera, as: 'TitikKamera' },
        { model: StatusKebakaran, as: 'StatusKebakaran' },
        { model: GambarPelaporan, as: 'GambarPelaporan' }
      ]
    });
    
    if (!pelaporan) {
      throw new HttpError('Pelaporan not found', 404);
    }
    
    return pelaporan;
  }
  
  public async create(data: PelaporanData, userId: number) {
    const nearbyCamera = await this.findNearbyCamera(data.latitud, data.longitud);
    
    const transaction = await sequelize.transaction();
    
    try {
      // 1. Create pelaporan
      const pelaporan = await Pelaporan.create({
        judul: data.judul,
        deskripsi: data.deskripsi,
        latitud: data.latitud,
        longitud: data.longitud,
        akun_socmed: data.akun_socmed || null,
        id_user: userId,
        id_titik_kamera: nearbyCamera?.id || null,
        id_status_kebakaran: 1
      }, { transaction });
      
      // 2. Create associated images if provided
      if (data.gambar && data.gambar.length > 0) {
        const gambarData = data.gambar.map(imageUrl => ({
          tautan: imageUrl,
          id_user: userId,
          id_pelaporan: pelaporan.id
        }));
        
        await GambarPelaporan.bulkCreate(gambarData, { transaction });
      }
      
      await transaction.commit();
      
      return await this.getById(pelaporan.id);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  
  public async addImage(pelaporanId: number, imageUrl: string, userId: number) {
    const pelaporan = await Pelaporan.findByPk(pelaporanId);
    
    if (!pelaporan) {
      throw new HttpError('Pelaporan not found', 404);
    }
    
    const gambar = await GambarPelaporan.create({
      tautan: imageUrl,
      id_user: userId,
      id_pelaporan: pelaporanId
    });
    
    return gambar;
  }
  
  public async updateStatus(id: number, statusId: number, reguDamkarId: number) {
    const pelaporan = await Pelaporan.findByPk(id);
    
    if (!pelaporan) {
      throw new HttpError('Pelaporan not found', 404);
    }
    
    // Verify penanganan exists
    const penanganan = await Penanganan.findOne({
      where: {
        id_pelaporan: id,
        id_regu_damkar: reguDamkarId
      }
    });
    
    if (!penanganan) {
      throw new HttpError('Your team is not assigned to handle this report', 403);
    }
    
    // Verify status exists
    const status = await StatusKebakaran.findByPk(statusId);
    if (!status) {
      throw new HttpError('Invalid status ID', 400);
    }
    
    // Update status
    await pelaporan.update({ id_status_kebakaran: statusId });
    
    // Return updated pelaporan with associations
    return await this.getById(id);
  }
  
  private async findNearbyCamera(lat: number, lng: number) {
    const cameras = await TitikKamera.findAll();
    
    let closestCamera = null;
    let minDistance = 50;
    
    for (const camera of cameras) {
      const distance = this.calculateDistance(
        lat, lng, 
        Number(camera.latitud), Number(camera.longitud)
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        closestCamera = camera;
      }
    }
    
    return closestCamera;
  }
  
  /**
   * Calculate the distance between two coordinates in meters
   * Using the Haversine formula
   */
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;
    
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    return R * c; // Distance in meters
  }
}