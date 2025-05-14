import { Sequelize } from 'sequelize';
import sequelize from '../config/database';
import { ModelWithAssociations } from '../types/model.types';

// Import all models
import User from './user';
import JenisUser from './jenis-user';
import JenisReguDamkar from './jenis-regu-damkar';
import JenisSumberAir from './jenis-sumber-air';
import JenisPenyalahgunaanUser from './jenis-penyalahgunaan-user';
import JenisPenyalahgunaanPelaporan from './jenis-penyalahgunaan-pelaporan';
import ReguDamkar from './regu-damkar';
import StatusKebakaran from './status-kebakaran';
import TitikKamera from './titik-kamera';
import MenanganiLahan from './menangani-lahan';
import Pelaporan from './pelaporan';
import GambarPelaporan from './gambar-pelaporan';
import Penanganan from './penanganan';
import DetailPenanganan from './detail-penanganan';
import PenyalahgunaanPelaporan from './penyalahgunaan-pelaporan';
import PenyalahgunaanUser from './penyalahgunaan-user';

// Define a type for the models collection
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

// Initialize models object
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

User.belongsTo(JenisUser, { foreignKey: 'id_jenis_user' });

// Set up associations between models if they exist
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export { sequelize };
export default models;