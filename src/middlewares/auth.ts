import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { Request, Response, NextFunction } from 'express';

export default function auth(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers['authorization'];

    if (!token) {
        res.status(401).json({ 
            status: 'fail',
            message: 'Unauthorized. Please login.'
        });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.body.id = decoded;
        next();
    } catch (error) {
        res.status(403).json({ 
            status: 'fail',
            message: 'Invalid token.'
        });
        return;
    }
}