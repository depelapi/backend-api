import PenyalahgunaanPelaporan from '../models/penyalahgunaanPelaporan';
import JenisPenyalahgunaanPelaporan from '../models/jenisPenyalahgunaanPelaporan';
import User from '../models/user';
import Pelaporan from '../models/pelaporan';
import { HttpError } from '../utils/errorHandler';

export interface PenyalahgunaanPelaporanData {
  deskripsi: string;
  id_pelaporan: number;
  id_jenis_penyalahgunaan_pelaporan: number;
}

export class PenyalahgunaanPelaporanService {
  public async getCountByPelaporan(pelaporanId: number): Promise<number> {
    return await PenyalahgunaanPelaporan.count({
      where: { id_pelaporan: pelaporanId }
    });
  }

  public async getAllByPelaporan(pelaporanId: number) {
    return await PenyalahgunaanPelaporan.findAll({
      where: { id_pelaporan: pelaporanId },
      include: [
        {
          model: JenisPenyalahgunaanPelaporan,
          as: 'jenis_penyalahgunaan_pelaporan',
          attributes: ['id', 'nama']
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'nama', 'email']
        }
      ],
      order: [['dibuat_pada', 'DESC']]
    });
  }

  public async getById(id: number) {
    const penyalahgunaan = await PenyalahgunaanPelaporan.findByPk(id, {
      include: [
        {
          model: JenisPenyalahgunaanPelaporan,
          as: 'jenis_penyalahgunaan_pelaporan',
          attributes: ['id', 'nama']
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'nama', 'email']
        },
        {
          model: Pelaporan,
          as: 'pelaporan',
          attributes: ['id', 'judul', 'deskripsi']
        }
      ]
    });

    if (!penyalahgunaan) {
      throw new HttpError('Penyalahgunaan pelaporan not found', 404);
    }

    return penyalahgunaan;
  }

  public async create(data: PenyalahgunaanPelaporanData, userId: number) {
    const pelaporan = await Pelaporan.findByPk(data.id_pelaporan);
    if (!pelaporan) {
      throw new HttpError('Pelaporan not found', 404);
    }

    const jenisPenyalahgunaan = await JenisPenyalahgunaanPelaporan.findByPk(
      data.id_jenis_penyalahgunaan_pelaporan
    );
    if (!jenisPenyalahgunaan) {
      throw new HttpError('Jenis penyalahgunaan pelaporan not found', 404);
    }

    const penyalahgunaan = await PenyalahgunaanPelaporan.create({
      deskripsi: data.deskripsi,
      id_pelaporan: data.id_pelaporan,
      id_jenis_penyalahgunaan_pelaporan: data.id_jenis_penyalahgunaan_pelaporan,
      id_user: userId
    });

    return this.getById(penyalahgunaan.id);
  }

  public async update(id: number, data: Partial<PenyalahgunaanPelaporanData>, userId: number) {
    const penyalahgunaan = await PenyalahgunaanPelaporan.findByPk(id);
    if (!penyalahgunaan) {
      throw new HttpError('Penyalahgunaan pelaporan not found', 404);
    }

    if (penyalahgunaan.id_user !== userId) {
      throw new HttpError('You can only update your own reports', 403);
    }

    if (data.id_jenis_penyalahgunaan_pelaporan) {
      const jenisPenyalahgunaan = await JenisPenyalahgunaanPelaporan.findByPk(
        data.id_jenis_penyalahgunaan_pelaporan
      );
      if (!jenisPenyalahgunaan) {
        throw new HttpError('Jenis penyalahgunaan pelaporan not found', 404);
      }
    }

    await penyalahgunaan.update({
      deskripsi: data.deskripsi !== undefined ? data.deskripsi : penyalahgunaan.deskripsi,
      id_jenis_penyalahgunaan_pelaporan: 
        data.id_jenis_penyalahgunaan_pelaporan !== undefined
          ? data.id_jenis_penyalahgunaan_pelaporan
          : penyalahgunaan.id_jenis_penyalahgunaan_pelaporan
    });

    return this.getById(id);
  }

  public async delete(id: number, userId: number) {
    const penyalahgunaan = await PenyalahgunaanPelaporan.findByPk(id);
    if (!penyalahgunaan) {
      throw new HttpError('Penyalahgunaan pelaporan not found', 404);
    }

    if (penyalahgunaan.id_user !== userId) {
      throw new HttpError('You can only delete your own reports', 403);
    }

    await penyalahgunaan.destroy();
    return { message: 'Penyalahgunaan pelaporan deleted successfully' };
  }
}