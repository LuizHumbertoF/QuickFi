import { Controller, Body, Get, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto.js';
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
        
        console.log(data);

        return this.authService.register(data);

    }
}
