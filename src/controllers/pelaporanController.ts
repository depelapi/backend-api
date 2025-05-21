import { Request, Response } from 'express';
import { PelaporanService } from '../services/pelaporanService';
import { sendErrorResponse } from '../utils/errorHandler';
import { getFileUrl } from '../utils/fileUpload';

export class PelaporanController {
  private pelaporanService: PelaporanService;
  
  constructor() {
    this.pelaporanService = new PelaporanService();
  }
  
  public getAllPelaporan = async (req: Request, res: Response): Promise<void> => {
    try {
      const filters: any = {
        recent: req.query.recent === 'true',
        older: req.query.older === 'true',
        titikKameraIds: req.query.cameraIds ? 
          (req.query.cameraIds as string).split(',').map(id => parseInt(id)) : 
          undefined,
        statusId: req.query.statusId ? 
          parseInt(req.query.statusId as string) : 
          undefined
      };
      
      if (req.query.lat && req.query.lng) {
        filters.proximity = {
          lat: parseFloat(req.query.lat as string),
          lng: parseFloat(req.query.lng as string),
          radius: req.query.radius ? parseFloat(req.query.radius as string) : 50 // Default 50m
        };
      }
      
      const pelaporan = await this.pelaporanService.getAll(filters);
      res.status(200).json(pelaporan);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  }
  
  public getPelaporanById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const pelaporan = await this.pelaporanService.getById(id);
      res.status(200).json(pelaporan);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  }
  
  public createPelaporan = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.user!.id);
      
      const imageUrls: string[] = [];
      
      // Handle uploaded files
      if (req.files && Array.isArray(req.files)) {
        const files = req.files as Express.Multer.File[];
        const uploadedUrls = files.map(file => getFileUrl(file.filename));
        imageUrls.push(...uploadedUrls);
      }
      
      // Add any URLs provided in the request body
      if (req.body.gambar) {
        if (Array.isArray(req.body.gambar)) {
          imageUrls.push(...req.body.gambar);
        } else {
          imageUrls.push(req.body.gambar);
        }
      }
      
      // Create the pelaporan data object with images if any provided
      const pelaporanData = {
        ...req.body,
        gambar: imageUrls.length > 0 ? imageUrls : undefined
      };
      
      const pelaporan = await this.pelaporanService.create(pelaporanData, userId);
      res.status(201).json(pelaporan);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  }
  
  public addImageToPelaporan = async (req: Request, res: Response): Promise<void> => {
    try {
      const pelaporanId = parseInt(req.params.id);
      const userId = parseInt(req.user!.id);
      
      let imageUrl: string;
      
      // Check for file or URL
      if (req.file) {
        imageUrl = getFileUrl(req.file.filename);
      } else if (req.body.tautan) {
        imageUrl = req.body.tautan;
      } else {
        res.status(400).json({ message: 'Image file or URL is required' });
        return;
      }
      
      const gambar = await this.pelaporanService.addImage(
        pelaporanId, 
        imageUrl,
        userId
      );
      
      res.status(201).json(gambar);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  }
  
  public updateStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const pelaporanId = parseInt(req.params.id);
      const statusId = parseInt(req.body.id_status_kebakaran);
      const reguDamkarId = req.reguDamkarId!;
      
      if (!statusId) {
        res.status(400).json({ message: 'id_status_kebakaran is required' });
        return;
      }
      
      const updatedPelaporan = await this.pelaporanService.updateStatus(
        pelaporanId,
        statusId,
        reguDamkarId
      );
      
      res.status(200).json(updatedPelaporan);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  };
}