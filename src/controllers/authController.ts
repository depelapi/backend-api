import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { sendErrorResponse } from '../utils/errorHandler';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public register = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.authService.register(req.body);
            res.status(201).json({
                message: 'User registered successfully',
                user
            });
        } catch (error) {
            sendErrorResponse(res, error);
        }
    }

    public login = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = await this.authService.login(req.body);
            res.status(200).json({ token });
        } catch (error) {
            sendErrorResponse(res, error, 401);
        }
    }

    // ! Implement logout method with token blacklisting later
}