import { HttpError } from '../utils/errorHandler';
import Penanganan from '../models/penanganan';
import User from '../models/user';
import ReguDamkar from '../models/reguDamkar';
import Pelaporan from '../models/pelaporan';

export class PenangananService {
  /**
   * Create a new penanganan
   */
  public async create(pelaporanId: number, userId: number, lokasiGmaps: string) {
    // Get user's regu_damkar
    const user = await User.findByPk(userId);
    if (!user?.id_regu_damkar) {
      throw new HttpError('User is not associated with any regu damkar', 403);
    }

    // Check if pelaporan exists
    const pelaporan = await Pelaporan.findByPk(pelaporanId);
    if (!pelaporan) {
      throw new HttpError('Pelaporan not found', 404);
    }

    // Check if pelaporan is already being handled
    const existingPenanganan = await Penanganan.findOne({
      where: { id_pelaporan: pelaporanId }
    });
    if (existingPenanganan) {
      throw new HttpError('This pelaporan is already being handled', 400);
    }

    // Create penanganan
    return await Penanganan.create({
      lokasi_gmaps: lokasiGmaps,
      id_regu_damkar: user.id_regu_damkar,
      id_pelaporan: pelaporanId,
      id_user: userId
    });
  }

  /**
   * Update lokasi_gmaps
   */
  public async updateLokasi(id: number, userId: number, lokasiGmaps: string) {
    const penanganan = await this.verifyOwnership(id, userId);
    return await penanganan.update({ lokasi_gmaps: lokasiGmaps });
  }

  /**
   * Update tiba_pada
   */
  public async updateTibaPada(id: number, userId: number, tibaPada: Date) {
    const penanganan = await this.verifyTeamMembership(id, userId);
    return await penanganan.update({ tiba_pada: tibaPada });
  }

  /**
   * Delete penanganan
   */
  public async delete(id: number, userId: number) {
    const penanganan = await this.verifyOwnership(id, userId);
    await penanganan.destroy();
    return { message: 'Penanganan deleted successfully' };
  }

  /**
   * Get all active penanganan for a pelaporan
   */
  public async getAllForPelaporan(pelaporanId: number) {
    return await Penanganan.findAll({
      where: { id_pelaporan: pelaporanId },
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['id', 'nama', 'email']
        },
        {
          model: ReguDamkar,
          as: 'ReguDamkar',
          attributes: ['id', 'nama']
        },
        {
          model: Pelaporan,
          as: 'Pelaporan',
          attributes: ['id', 'judul', 'deskripsi']
        }
      ]
    });
  }

  /**
   * Verify penanganan ownership
   */
  private async verifyOwnership(id: number, userId: number) {
    const penanganan = await Penanganan.findByPk(id);
    if (!penanganan) {
      throw new HttpError('Penanganan not found', 404);
    }
    if (penanganan.id_user !== userId) {
      throw new HttpError('You can only modify penanganan you created', 403);
    }
    return penanganan;
  }

  /**
   * Verify team membership
   */
  private async verifyTeamMembership(id: number, userId: number) {
    const penanganan = await Penanganan.findByPk(id);
    if (!penanganan) {
      throw new HttpError('Penanganan not found', 404);
    }

    const user = await User.findByPk(userId);
    if (!user?.id_regu_damkar || user.id_regu_damkar !== penanganan.id_regu_damkar) {
      throw new HttpError('You must be in the same regu damkar to update arrival time', 403);
    }

    return penanganan;
  }
}