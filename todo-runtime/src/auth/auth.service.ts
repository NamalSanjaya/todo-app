import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService){}

    // username is unique
    async validateUser(username: string, password: string): Promise<string>{
        const user = await this.usersService.findUser(username)
        if(user === null) return ""
        const passwordValid = await bcrypt.compare(password, user.password)
        if(passwordValid){
            return username
        }
        return "";
    }
    async login(username: string){
        const payload = {
            "iss" : "auth",
            "aud" : [ "users", "tasks" ],
            "sub": username
        }
        return {
            "access_token": this.jwtService.sign(payload)
        }
    }
}
