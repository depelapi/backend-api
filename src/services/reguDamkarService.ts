import JenisReguDamkar from '../models/jenisReguDamkar';
import ReguDamkar from '../models/reguDamkar';
import { HttpError } from '../utils/errorHandler';

export class ReguDamkarService {
  public async getAll() {
    return await ReguDamkar.findAll({
      include: [{
        model: JenisReguDamkar,
        as: 'JenisReguDamkar'
      }]
    });
  }

  public async getById(id: number) {
    const reguDamkar = await ReguDamkar.findByPk(id, {
      include: 'JenisReguDamkar'
    });
    
    if (!reguDamkar) {
      throw new HttpError('Regu damkar not found', 404);
    }
    
    return reguDamkar;
  }

    public async getByJenisId(jenisId: number) {
    const reguDamkars = await ReguDamkar.findAll({
      where: {
        id_jenis_regu_damkar: jenisId
      },
      include: 'JenisReguDamkar'
    });
    
    return reguDamkars;
  }

  public async getAllJenis() {
    return await JenisReguDamkar.findAll(

      
    );
  }

  public async create(data: { nama: string; id_jenis_regu_damkar: number }) {
    try {
      return await ReguDamkar.create(data);
    } catch (error) {
      if (error instanceof Error && error.name === 'SequelizeUniqueConstraintError') {
        throw new HttpError('Regu damkar with this name already exists', 400);
      }
      throw error;
    }
  }

  public async update(id: number, data: { nama?: string; id_jenis_regu_damkar?: number }) { // ! Make middleware to disallow chaning id_jenis_regu_damkar
    const reguDamkar = await this.getById(id);
    
    try {
      await reguDamkar.update(data);
      return await this.getById(id);
    } catch (error) {
      if (error instanceof Error && error.name === 'SequelizeUniqueConstraintError') {
        throw new HttpError('Regu damkar with this name already exists', 400);
      }
      throw error;
    }
  }

  public async delete(id: number) {
    const reguDamkar = await this.getById(id);
    await reguDamkar.destroy();
    return { message: 'Regu damkar deleted successfully' };
  }
}