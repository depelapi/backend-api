import DetailPenanganan from '../models/detailPenanganan';
import Penanganan from '../models/penanganan';
import JenisSumberAir from '../models/jenisSumberAir';
import { HttpError } from '../utils/errorHandler';
import { Op } from 'sequelize';
import ReguDamkar from '../models/reguDamkar';

export interface DetailPenangananData {
  deskripsi: string;
  penyebab: string;
  akses_jalan: string;
  kendala_di_lapangan: string;
  korban_jiwa: number;
  bangunan_terdampak?: number;
  selesai_pada?: Date | null;
  id_jenis_sumber_air: number;
}

export class DetailPenangananService {
  public async create(data: DetailPenangananData, penangananId: number) {
    const penanganan = await Penanganan.findByPk(penangananId);
    if (!penanganan) {
      throw new HttpError('Penanganan not found', 404);
    }

    const existingDetail = await DetailPenanganan.findOne({
      where: { id_penanganan: penangananId }
    });
    
    if (existingDetail) {
      throw new HttpError('Detail penanganan already exists for this penanganan', 400);
    }

    const detailPenanganan = await DetailPenanganan.create({
      ...data,
      id_penanganan: penangananId
    });

    return this.getById(detailPenanganan.id);
  }

  public async getById(id: number) {
    const detailPenanganan = await DetailPenanganan.findByPk(id, {
      include: [
        {
          model: JenisSumberAir,
          as: 'JenisSumberAir',
          attributes: ['id', 'nama']
        },
        {
          model: Penanganan,
          as: 'Penanganan',
          attributes: ['id', 'lokasi_gmaps', 'tiba_pada', 'id_regu_damkar', 'id_pelaporan']
        }
      ]
    });

    if (!detailPenanganan) {
      throw new HttpError('Detail penanganan not found', 404);
    }

    return detailPenanganan;
  }

  public async getAllForPenanganan(penangananId: number) {
    return await DetailPenanganan.findAll({
      where: { id_penanganan: penangananId },
      include: [
        {
          model: JenisSumberAir,
          as: 'JenisSumberAir',
          attributes: ['id', 'nama']
        }
      ]
    });
  }

  public async update(id: number, data: Partial<DetailPenangananData>) {
    const detailPenanganan = await DetailPenanganan.findByPk(id);
    
    if (!detailPenanganan) {
      throw new HttpError('Detail penanganan not found', 404);
    }

    await detailPenanganan.update(data);
    return this.getById(id);
  }

  public async delete(id: number) {
    const detailPenanganan = await DetailPenanganan.findByPk(id);
    
    if (!detailPenanganan) {
      throw new HttpError('Detail penanganan not found', 404);
    }

    await detailPenanganan.destroy();
    return { message: 'Detail penanganan deleted successfully' };
  }

  public async getAllForPelaporan(pelaporanId: number) {
    const penangananList = await Penanganan.findAll({
      where: { id_pelaporan: pelaporanId },
      attributes: ['id']
    });
    
    const penangananIds = penangananList.map(p => p.id);
    
    if (penangananIds.length === 0) {
      return [];
    }
    
    return await DetailPenanganan.findAll({
      where: { 
        id_penanganan: {
          [Op.in]: penangananIds
        } 
      },
      include: [
        {
          model: JenisSumberAir,
          as: 'JenisSumberAir',
          attributes: ['id', 'nama']
        },
        {
          model: Penanganan,
          as: 'Penanganan',
          attributes: ['id', 'lokasi_gmaps', 'tiba_pada', 'id_regu_damkar', 'id_pelaporan'],
          include: [
            {
              model: ReguDamkar,
              as: 'ReguDamkar',
              attributes: ['id', 'nama']
            }
          ]
        }
      ]
    });
  }
}