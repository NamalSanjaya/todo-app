import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  // POST /login
  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Request() req): any {
    return this.authService.login(req.user)  // req.user contain the username(string)
  }

  @UseGuards(JwtAuthGuard)
  @Get("hi")
  getHello() {
    return {"msg": "hi"}
  }
}

// req --> UseGuards middleware --> login route handler
/**
 * Within UseGuard Middleware
 * 1. Go to AuthGuard in passport 
 * 2. Trigger validate method in LocalStrategy(PassportStrategy).
 * 3. After validation, return value of that function is stored in request object by passport.
 * 4. route handler can access those information from Request object.
 */
