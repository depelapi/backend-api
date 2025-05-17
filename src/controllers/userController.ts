import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { sendErrorResponse } from '../utils/errorHandler';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public getUserDetails = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = parseInt(req.params.id);
            const user = await this.userService.getUserById(userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            sendErrorResponse(res, error);
        }
    }

    // public async updateUser(req: Request, res: Response): Promise<void> {
    //     try {
    //         const userId = req.params.id;
    //         const updatedUser = await this.userService.updateUser(userId, req.body);
    //         if (!updatedUser) {
    //             res.status(404).json({ message: 'User not found' });
    //             return;
    //         }
    //         res.status(200).json(updatedUser);
    //     } catch (error) {
    //         sendErrorResponse(res, error);
    //     }
    // }

    // public async deleteUser(req: Request, res: Response): Promise<void> {
    //     try {
    //         const userId = req.params.id;
    //         const result = await this.userService.deleteUser(userId);
    //         if (!result) {
    //             res.status(404).json({ message: 'User not found' });
    //             return;
    //         }
    //         res.status(204).send();
    //     } catch (error) {
    //         sendErrorResponse(res, error);
    //     }
    // }
}