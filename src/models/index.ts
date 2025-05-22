import { Sequelize } from 'sequelize';
import sequelize from '../config/database';
import { ModelWithAssociations } from '../types/model.types';

import User from './user';
import JenisUser from './jenisUser';
import JenisReguDamkar from './jenisReguDamkar';
import JenisSumberAir from './jenisSumberAir';
import JenisPenyalahgunaanUser from './jenisPenyalahgunaanUser';
import JenisPenyalahgunaanPelaporan from './jenisPenyalahgunaanPelaporan';
import ReguDamkar from './reguDamkar';
import StatusKebakaran from './statusKebakaran';
import TitikKamera from './titikKamera';
import MenanganiLahan from './menanganiLahan';
import Pelaporan from './pelaporan';
import GambarPelaporan from './gambarPelaporan';
import Penanganan from './penanganan';
import DetailPenanganan from './detailPenanganan';
import PenyalahgunaanPelaporan from './penyalahgunaanPelaporan';
import PenyalahgunaanUser from './penyalahgunaanUser';

interface Models {
  User: ModelWithAssociations;
  JenisUser: ModelWithAssociations;
  JenisReguDamkar: ModelWithAssociations;
  JenisSumberAir: ModelWithAssociations;
  JenisPenyalahgunaanUser: ModelWithAssociations;
  JenisPenyalahgunaanPelaporan: ModelWithAssociations;
  ReguDamkar: ModelWithAssociations;
  StatusKebakaran: ModelWithAssociations;
  TitikKamera: ModelWithAssociations;
  MenanganiLahan: ModelWithAssociations;
  Pelaporan: ModelWithAssociations;
  GambarPelaporan: ModelWithAssociations;
  Penanganan: ModelWithAssociations;
  DetailPenanganan: ModelWithAssociations;
  PenyalahgunaanPelaporan: ModelWithAssociations;
  PenyalahgunaanUser: ModelWithAssociations;
  [key: string]: ModelWithAssociations;
}

const models: Models = {
  User,
  JenisUser,
  JenisReguDamkar,
  JenisSumberAir,
  JenisPenyalahgunaanUser,
  JenisPenyalahgunaanPelaporan,
  ReguDamkar,
  StatusKebakaran,
  TitikKamera,
  MenanganiLahan,
  Pelaporan,
  GambarPelaporan,
  Penanganan,
  DetailPenanganan,
  PenyalahgunaanPelaporan,
  PenyalahgunaanUser,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export { sequelize };
export default models;