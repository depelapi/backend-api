import bcrypt from 'bcrypt';
import users from '../models/user.js';
import jwt from 'jsonwebtoken';
import { Request, Response, RequestHandler } from 'express';
import "dotenv/config";

const login: RequestHandler = async (req, res): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ 
            status: 'fail',
            message: 'Email and password are required.' 
        });
        return;
    }

    try {
        const user = await users.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({ 
                status: 'fail',
                message: 'Invalid email or password.' 
            });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password!);
        if (!isPasswordValid) {
            res.status(400).json({ 
                status: 'fail',
                message: 'Invalid email or password.' 
            });
            return;
        }

        if (!process.env.JWT_SECRET) {
            res.status(500).json({
                status: 'error',
                message: 'JWT configuration error'
            });
            return;
        }

        const token = jwt.sign(
            { id: user.id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
        );

        res.status(200).json({
            status: 'success',
            message: 'Login successful.',
            body: { id: user.id, nama: user.nama, email: user.email, token }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error.',
            error: error instanceof Error ? error.message : String(error) 
        });
    }
};

const logout: RequestHandler = async (req, res): Promise<void> => {
    const { id } = req.body;

    try {
        const user = await users.findOne({ where: { id } });
        if (!user) {
            res.status(400).json({ 
                status: 'fail', 
                message: 'User ID not found.' 
            });
            return;
        }

        res.status(200).json({
            status: 'success',
            message: 'Logout successful.',
            body: { id: user.id, token: "" }
        });
    } catch (error) {
        console.error('Error logging out user:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error.'
        });
    }
};

export default { login, logout };