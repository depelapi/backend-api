import User from '../models/user';
import { hashPassword } from '../utils/passwordHelper';

export class UserService {
    public async createUser (userData: { username: string; password: string }) {
        const hashedPassword = await hashPassword(userData.password);
        const newUser = await User.create({
            username: userData.username,
            password: hashedPassword,
        });
        return newUser;
    };
    
    public async getUserById (userId: number) {
        const user = await User.findByPk(userId);
        if (!user) return null;
        const { password, ...userWithoutPassword } = user.get({ plain: true });
        return userWithoutPassword;
    };
    
    public async getAllUsers () {
        const users = await User.findAll();
        return users;
    };
}