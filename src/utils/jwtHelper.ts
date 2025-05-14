import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '7d';

export const generateToken = (userId: string): string => {
    const payload = { id: userId };
    const secretKey = JWT_SECRET as Secret;
    const options: SignOptions = { expiresIn: JWT_EXPIRATION as jwt.SignOptions["expiresIn"] };
    
    return jwt.sign(payload, secretKey, options);
};

export const verifyToken = (token: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET as Secret, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            resolve(decoded);
        });
    });
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }

    verifyToken(token)
        .then(decoded => {
            req.user = decoded;
            next();
        })
        .catch(err => {
            return res.sendStatus(403);
        });
};