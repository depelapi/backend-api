import User from '../models/user';
import { generateToken } from '../utils/jwtHelper';
import { hashPassword, comparePassword } from '../utils/passwordHelper';

export class AuthService {
    public async register(userData: { email: string, password: string }) {
        const hashedPassword = await hashPassword(userData.password);
        const newUser = await User.create({ 
            email: userData.email, 
            password: hashedPassword 
        });
        return newUser;
    }

    public async login(credentials: { email: string, password: string }) {
        const user = await User.findOne({ where: { email: credentials.email } });
        if (!user) {
            throw new Error('User not found');
        }
        
        const isPasswordValid = await comparePassword(credentials.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        
        const token = generateToken(user.id.toString());
        return token;
    }
}