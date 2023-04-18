import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user.model';
import UserRepository from '../repository/user.repository';

dotenv.config();

const secretJWT = process.env.JWT_SECRET_KEY ?? "";

class UserService {
    getAll() {
        return UserRepository.getAll();
    }

    getByEmployerCode(employerCode: number) {
        return UserRepository.getByEmployerCode(employerCode);
    }

    async create(user: IUser) {
        if(user.password) {
            user.password = await bcrypt.hash(user.password, 10);
        }
        return UserRepository.create(user);
    }

    async authorization(employerCode: number, password: string) {
        const user = await UserRepository.getByEmployerCode(employerCode);
        
        if(!user) throw new Error('User not found');

        const result = await bcrypt.compare(password, user.password!);

        if(result) {
            return jwt.sign({ 
              employerCode: user.employerCode, 
              _id: user._id, 
              role: user.role, 
              name: user.name 
            }, secretJWT, {
                expiresIn: '1h'
            });
        };

        throw new Error('Authentication failed');
    }
    
    update(employerCode: number, user: Partial<IUser>) {
      const userUpdated: Partial<IUser> = {...user, updatedAt: new Date()}
      return UserRepository.update(employerCode, userUpdated);
    }

    remove(employerCode: number) {
        const user: Partial<IUser> = {deletedAt: new Date()}
        
        return UserRepository.remove(employerCode, user);
    }
}

export default new UserService();