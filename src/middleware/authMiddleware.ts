import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    let token: string | undefined;
    
    if (authHeader) {
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        } else {
            token = authHeader;
        }
    }
    
    // console.log('Token:', token);
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);
    console.log('Request Params:', req.params);
    console.log('Request Query:', req.query);
    console.log('Request User:', req.user);
    
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.id_jenis_user)) {
            return res.sendStatus(403);
        }
        next();
    };
};

export const authorizeIdJenisUser = (...allowedIdJenusUsers: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !allowedIdJenusUsers.includes(req.user.id_jenis_user)) {
            return res.sendStatus(403);
        }
        next();
    };
};
