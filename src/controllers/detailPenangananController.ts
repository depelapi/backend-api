import { Request, Response } from 'express';
import { DetailPenangananService } from '../services/detailPenangananService';
import { sendErrorResponse } from '../utils/errorHandler';

export class DetailPenangananController {
  private detailPenangananService: DetailPenangananService;

  constructor() {
    this.detailPenangananService = new DetailPenangananService();
  }

  public createDetailPenanganan = async (req: Request, res: Response): Promise<void> => {
    try {
      const penangananId = parseInt(req.params.penangananId);
      const detailPenanganan = await this.detailPenangananService.create(
        req.body,
        penangananId
      );
      res.status(201).json(detailPenanganan);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  };

  public getDetailPenangananById = async (req: Request, res: Response): Promise<void> => {
    try {
      const detailPenangananId = parseInt(req.params.id);
      const detailPenanganan = await this.detailPenangananService.getById(detailPenangananId);
      res.status(200).json(detailPenanganan);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  };

  public getAllDetailPenanganan = async (req: Request, res: Response): Promise<void> => {
    try {
      const penangananId = parseInt(req.params.penangananId);
      const detailPenanganan = await this.detailPenangananService.getAllForPenanganan(penangananId);
      res.status(200).json(detailPenanganan);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  };

  public updateDetailPenanganan = async (req: Request, res: Response): Promise<void> => {
    try {
      const detailPenangananId = parseInt(req.params.id);
      const detailPenanganan = await this.detailPenangananService.update(
        detailPenangananId,
        req.body
      );
      res.status(200).json(detailPenanganan);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  };

  public deleteDetailPenanganan = async (req: Request, res: Response): Promise<void> => {
    try {
      const detailPenangananId = parseInt(req.params.id);
      const result = await this.detailPenangananService.delete(detailPenangananId);
      res.status(200).json(result);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  };

  public getAllDetailPenangananForPelaporan = async (req: Request, res: Response): Promise<void> => {
    try {
      const pelaporanId = parseInt(req.params.pelaporanId);
      const detailPenanganan = await this.detailPenangananService.getAllForPelaporan(pelaporanId);
      res.status(200).json(detailPenanganan);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  };
}