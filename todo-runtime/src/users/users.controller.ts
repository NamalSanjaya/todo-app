import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('/signup')
    async createUser(
        @Body('password') password: string,
        @Body('username') username: string,
    ): Promise<User> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const result = await this.usersService.createUser(
            username,
            hashedPassword,
        );
        return result;
    }

    // Get /users/193950
    // TODO: if user_id is not valid mongodb ID then it will return an error. This should be BadReq.
    @Get(":user_id")
    async getUserInfo(@Param("user_id") userId: string){
        return await this.usersService.findById(userId)
    }
}
