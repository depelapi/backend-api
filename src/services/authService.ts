import { Transaction } from 'sequelize';
import User from '../models/user';
import TitikKamera from '../models/titikKamera';
import { generateToken } from '../utils/jwtHelper';
import { hashPassword, comparePassword } from '../utils/passwordHelper';
import { HttpError } from '../utils/errorHandler';
import sequelize from '../config/database';
import ReguDamkar from '../models/reguDamkar';
import MenanganiLahan from '../models/menanganiLahan';

interface BaseUserData {
  nama: string;
  email: string;
  password: string;
  no_telpon?: string;
  id_jenis_user: number;
}

interface DamkarData extends BaseUserData {
  id_regu_damkar: number;
}

interface PemilikLahanData extends BaseUserData {
  titik_kamera?: {
    nama: string;
    id_device: string;
    latitud: number;
    longitud: number;
    notifikasi_publik?: boolean;
  }[];
  regu_damkar?: {
    nama: string;
    menangani_lahan?: number[]; // Array of titik_kamera IDs to associate
  }[];
}

interface BPBDData extends BaseUserData {
  nip: string;
}

export class AuthService {
  public async register(userData: any) {
    // Validate role type
    const roleId = parseInt(userData.id_jenis_user);
    
    if (!roleId || roleId < 1 || roleId > 4) {
      throw new HttpError('Invalid role type', 400);
    }
    
    // Basic validation for all roles
    this.validateBaseUserData(userData);
    
    // Role-specific validation and registration
    switch(roleId) {
      case 1: // Masyarakat
        return this.registerMasyarakat(userData);
      case 2: // Damkar
        return this.registerDamkar(userData as DamkarData);
      case 3: // Pemilik Lahan
        return this.registerPemilikLahan(userData as PemilikLahanData);
      case 4: // BPBD
        return this.registerBPBD(userData as BPBDData);
      default:
        throw new HttpError('Invalid role type', 400);
    }
  }

  private validateBaseUserData(userData: BaseUserData) {
    // Basic validations
    if (!userData.email || !userData.email.includes('@')) {
      throw new HttpError('Valid email is required', 400);
    }

    if (!userData.password || userData.password.length < 6) {
      throw new HttpError('Password must be at least 6 characters', 400);
    }

    if (!userData.nama || userData.nama.trim() === '') {
      throw new HttpError('Name is required', 400);
    }
  }

  private async registerMasyarakat(userData: BaseUserData) {
    const hashedPassword = await hashPassword(userData.password);
    
    const newUser = await User.create({
      nama: userData.nama,
      email: userData.email,
      password: hashedPassword,
      no_telpon: userData.no_telpon,
      id_jenis_user: userData.id_jenis_user
    });
    
    const { password, ...userWithoutPassword } = newUser.get({ plain: true });
    return userWithoutPassword;
  }

  private async registerDamkar(userData: DamkarData) {
    if (!userData.id_regu_damkar) {
      throw new HttpError('Regu Damkar is required for Damkar role', 400);
    }
    
    const hashedPassword = await hashPassword(userData.password);
    
    const newUser = await User.create({
      nama: userData.nama,
      email: userData.email,
      password: hashedPassword,
      no_telpon: userData.no_telpon,
      id_jenis_user: userData.id_jenis_user,
      id_regu_damkar: userData.id_regu_damkar
    });
    
    const { password, ...userWithoutPassword } = newUser.get({ plain: true });
    return userWithoutPassword;
  }

  private async registerPemilikLahan(userData: PemilikLahanData) {
    const transaction = await sequelize.transaction();
    
    try {
      // 1. Create user
      const hashedPassword = await hashPassword(userData.password);
      
      const newUser = await User.create({
        nama: userData.nama,
        email: userData.email,
        password: hashedPassword,
        no_telpon: userData.no_telpon,
        id_jenis_user: userData.id_jenis_user
      }, { transaction });
      
      // 2. Create titik_kamera entries if provided
      const createdCameras: TitikKamera[] = [];
      if (userData.titik_kamera && userData.titik_kamera.length > 0) {
        const titikKameraData = userData.titik_kamera.map(camera => ({
          ...camera,
          id_user: newUser.id,
          notifikasi_publik: camera.notifikasi_publik || false
        }));
        
        const cameras = await TitikKamera.bulkCreate(titikKameraData, { 
          transaction,
          returning: true 
        });
        createdCameras.push(...cameras);
      }
      
      // 3. Create regu_damkar entries if provided
      if (userData.regu_damkar && userData.regu_damkar.length > 0) {
        // Create regu_damkar entries
        for (const reguData of userData.regu_damkar) {
          // Create the regu_damkar with fixed type = 2
          const newReguDamkar = await ReguDamkar.create({
            nama: reguData.nama,
            id_jenis_regu_damkar: 2 // Fixed value as per requirement
          }, { transaction });
          
          // If menangani_lahan mappings provided, create them
          if (reguData.menangani_lahan && reguData.menangani_lahan.length > 0) {
            // Create mapping between array indices and actual camera IDs
            const validRelations = [];
            
            for (const index of reguData.menangani_lahan) {
              // Make sure the index is valid
              if (index >= 0 && index < createdCameras.length) {
                validRelations.push({
                  id_regu_damkar: newReguDamkar.id,
                  id_titik_kamera: createdCameras[index].id
                });
              }
            }
            
            if (validRelations.length > 0) {
              await MenanganiLahan.bulkCreate(validRelations, { transaction });
            }
          }
        }
      }
      
      await transaction.commit();
      
      // Return user data without password
      const { password, ...userWithoutPassword } = newUser.get({ plain: true });
      return userWithoutPassword;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  private async registerBPBD(userData: BPBDData) {
    if (!userData.nip) {
      throw new HttpError('NIP is required for BPBD role', 400);
    }
    
    const hashedPassword = await hashPassword(userData.password);
    
    const newUser = await User.create({
      nama: userData.nama,
      email: userData.email,
      password: hashedPassword,
      no_telpon: userData.no_telpon,
      nip: userData.nip,
      id_jenis_user: userData.id_jenis_user
    });
    
    const { password, ...userWithoutPassword } = newUser.get({ plain: true });
    return userWithoutPassword;
  }

  // Keep existing login method
  public async login(credentials: { email: string, password: string }) {
    const user = await User.findOne({ where: { email: credentials.email } });
    if (!user) {
      throw new HttpError('User not found', 404);
    }
    
    const isPasswordValid = await comparePassword(credentials.password, user.password!);
    if (!isPasswordValid) {
      throw new HttpError('Invalid password', 401);
    }
    
    const token = generateToken(user.id.toString(), user.id_jenis_user.toString());
    return token;
  }
}