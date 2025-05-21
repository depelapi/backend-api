import { Request, Response } from 'express';
import { PenyalahgunaanPelaporanService } from '../services/penyalahgunaanPelaporanService';
import { sendErrorResponse } from '../utils/errorHandler';

export class PenyalahgunaanPelaporanController {
  private penyalahgunaanPelaporanService: PenyalahgunaanPelaporanService;

  constructor() {
    this.penyalahgunaanPelaporanService = new PenyalahgunaanPelaporanService();
  }

  public getCountByPelaporan = async (req: Request, res: Response): Promise<void> => {
    try {
      const pelaporanId = parseInt(req.params.pelaporanId);
      const count = await this.penyalahgunaanPelaporanService.getCountByPelaporan(pelaporanId);
      
      res.status(200).json({ count });
    } catch (error) {
      sendErrorResponse(res, error);
    }
  };

  public getAllByPelaporan = async (req: Request, res: Response): Promise<void> => {
    try {
      const pelaporanId = parseInt(req.params.pelaporanId);
      const reports = await this.penyalahgunaanPelaporanService.getAllByPelaporan(pelaporanId);
      
      res.status(200).json(reports);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  };

  public getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const report = await this.penyalahgunaanPelaporanService.getById(id);
      
      res.status(200).json(report);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.user!.id);
      const report = await this.penyalahgunaanPelaporanService.create(req.body, userId);
      
      res.status(201).json(report);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const userId = parseInt(req.user!.id);
      
      const report = await this.penyalahgunaanPelaporanService.update(id, req.body, userId);
      
      res.status(200).json(report);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const userId = parseInt(req.user!.id);
      
      const result = await this.penyalahgunaanPelaporanService.delete(id, userId);
      
      res.status(200).json(result);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  };
}