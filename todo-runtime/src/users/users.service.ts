import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from './users.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel('user') private readonly userModel: Model<UserDocument>) { }
    async createUser(username: string, password: string): Promise<User> {
        return await this.userModel.create({
            username,
            password,
        });
    }
    async findUser(username: string): Promise<User|null> {
        return await this.userModel.findOne({username: username});
    }

    async findById(id: string): Promise<User|null>{
        return await this.userModel.findOne({_id:  new mongoose.Types.ObjectId(id)});
    }
}
