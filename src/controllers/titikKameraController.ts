import { Request, Response } from 'express';
import { TitikKameraService } from '../services/titikKameraService';
import { sendErrorResponse } from '../utils/errorHandler';

export class TitikKameraController {
  private titikKameraService: TitikKameraService;
  
  constructor() {
    this.titikKameraService = new TitikKameraService();
  }
  
  public getAllCameras = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.user!.id);
      const cameras = await this.titikKameraService.getAllByUserId(userId);
      res.status(200).json(cameras);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  }
  
  public getCameraById = async (req: Request, res: Response): Promise<void> => {
    try {
      const cameraId = parseInt(req.params.id);
      const userId = parseInt(req.user!.id);
      const camera = await this.titikKameraService.getById(cameraId, userId);
      res.status(200).json(camera);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  }
  
  public createCamera = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.user!.id);
      const camera = await this.titikKameraService.create(req.body, userId);
      res.status(201).json(camera);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  }
  
  public updateCamera = async (req: Request, res: Response): Promise<void> => {
    try {
      const cameraId = parseInt(req.params.id);
      const userId = parseInt(req.user!.id);
      const camera = await this.titikKameraService.update(cameraId, req.body, userId);
      res.status(200).json(camera);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  }
  
  public deleteCamera = async (req: Request, res: Response): Promise<void> => {
    try {
      const cameraId = parseInt(req.params.id);
      const userId = parseInt(req.user!.id);
      const result = await this.titikKameraService.delete(cameraId, userId);
      res.status(200).json(result);
    } catch (error) {
      sendErrorResponse(res, error);
    }
  }
}