import { Request, Response } from 'express';
import { PenangananService } from '../services/penangananService';
import { sendErrorResponse } from '../utils/errorHandler';

export class PenangananController {
  private penangananService: PenangananService;

  constructor() {
    this.penangananService = new PenangananService();
  }

  public createPenanganan = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.user!.id);
      const { id_pelaporan, lokasi_gmaps } = req.body;

      if (!id_pelaporan || !lokasi_gmaps) {
        res.status(400).json({ message: 'id_pelaporan and lokasi_gmaps are required' });
        return;
      }

      const penanganan = await this.penangananService.create(
        parseInt(id_pelaporan),
        userId,
        lokasi_gmaps
      );

      res.status(201).json(penanganan);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  };

  public updateLokasi = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.user!.id);
      const penangananId = parseInt(req.params.id);
      const { lokasi_gmaps } = req.body;

      if (!lokasi_gmaps) {
        res.status(400).json({ message: 'lokasi_gmaps is required' });
        return;
      }

      const penanganan = await this.penangananService.updateLokasi(
        penangananId,
        userId,
        lokasi_gmaps
      );

      res.status(200).json(penanganan);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  };

  public updateTibaPada = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.user!.id);
      const penangananId = parseInt(req.params.id);
      const { tiba_pada } = req.body;

      if (!tiba_pada) {
        res.status(400).json({ message: 'tiba_pada is required' });
        return;
      }

      const penanganan = await this.penangananService.updateTibaPada(
        penangananId,
        userId,
        new Date(tiba_pada)
      );

      res.status(200).json(penanganan);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  };

  public deletePenanganan = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.user!.id);
      const penangananId = parseInt(req.params.id);

      const result = await this.penangananService.delete(penangananId, userId);
      res.status(200).json(result);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  };

  public getPenangananForPelaporan = async (req: Request, res: Response): Promise<void> => {
    try {
      const pelaporanId = parseInt(req.params.id);
      const penanganan = await this.penangananService.getAllForPelaporan(pelaporanId);
      res.status(200).json(penanganan);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  };
}