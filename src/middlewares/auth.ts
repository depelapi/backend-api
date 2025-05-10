import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { Request, Response, NextFunction } from 'express';

export default function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ 
            status: 'fail',
            message: 'Unauthorized. Please login.'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.body.id = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ 
            status: 'fail',
            message: 'Invalid token.'
        });
    }
}