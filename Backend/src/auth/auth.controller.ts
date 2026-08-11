import { Controller, Body, Get, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Get()
    getAuth() {
        return "Auth funcionando!";
    }

    @Post('register')
    register(@Body() data: RegisterDto) {
        

        return this.authService.register(data);

    }

    @Post('login')
    login(@Body() data: LoginDto) {

        return this.authService.login(data);
    }
}
