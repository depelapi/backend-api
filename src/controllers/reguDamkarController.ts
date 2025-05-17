import { Request, Response } from 'express';
import { ReguDamkarService } from '../services/reguDamkarService';
import { sendErrorResponse } from '../utils/errorHandler';

export class ReguDamkarController {
  private reguDamkarService: ReguDamkarService;

  constructor() {
    this.reguDamkarService = new ReguDamkarService();
  }

  public getAllReguDamkar = async (req: Request, res: Response): Promise<void> => {
    try {
      const reguDamkars = await this.reguDamkarService.getAll();
      res.status(200).json(reguDamkars);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  }

  public getReguDamkarByJenisId = async (req: Request, res: Response): Promise<void> => {
    try {
      const jenisId = parseInt(req.params.jenisId);
      const reguDamkars = await this.reguDamkarService.getByJenisId(jenisId);
      res.status(200).json(reguDamkars);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  }

  public getReguDamkarById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const reguDamkar = await this.reguDamkarService.getById(id);
      res.status(200).json(reguDamkar);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  }

  public createReguDamkar = async (req: Request, res: Response): Promise<void> => {
    try {
      const reguDamkar = await this.reguDamkarService.create(req.body);
      res.status(201).json(reguDamkar);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  }

  public updateReguDamkar = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const updatedReguDamkar = await this.reguDamkarService.update(id, req.body);
      res.status(200).json(updatedReguDamkar);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  }

  public deleteReguDamkar = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const result = await this.reguDamkarService.delete(id);
      res.status(200).json(result);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  }
}