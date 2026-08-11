import { RegisterDto } from "./dto/register.dto.js";
import { PrismaService } from "../prisma/prisma.service.js";
import * as bcrypt from "bcrypt"; // <-- Correção do import
import { Injectable, ConflictException, InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    async register(data: RegisterDto) {
    
        const user = await this.prisma.user.findUnique({
            where: { email: data.email }
        });

        if (user) {
            
            throw new ConflictException('Usuário já cadastrado no banco.');
        }
        
        const passwordHash = await bcrypt.hash(data.password, 10);

        const newUser = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: passwordHash,
            }
        });
        
        const token = this.jwtService.sign({
            sub: newUser.id,
            email: newUser.email
        })
        return { access_token: token };

    }
}