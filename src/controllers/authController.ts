import { Request, Response } from 'express';
import User from '../models/user';
import { AuthService } from '../services/authService';
import { handleError } from '../utils/errorHandler';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public async register(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.authService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            handleError(res, error);
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const token = await this.authService.login(req.body);
            res.status(200).json({ token });
        } catch (error) {
            handleError(res, error);
        }

    // !! Implement logout method with token blacklisting later
    }
}