import { RegisterDto } from "./dto/register.dto.js";
import { PrismaService } from "../prisma/prisma.service.js";
import * as bcrypt from "bcrypt"; // <-- Correção do import
import { Injectable, ConflictException, InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto.js";

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
                surname: data.surname,
                email: data.email,
                password: passwordHash,
            }
        });
        
        const token = this.jwtService.sign({
            sub: newUser.id,
            name: newUser.name,
            surname: newUser.surname,
            email: newUser.email
        });

        const payload = JSON.parse(
            Buffer.from(token.split(".")[1], "base64url").toString()
        );
        console.log("payload: ", payload);

        return { 
            access_token: token, 
            payload: payload
        };

    }

    async login(data: LoginDto) {

        const user = await this.prisma.user.findUnique({
            where: { email: data.email }
        });

        if (!user) {
            
            throw new Error('Email inválido.');
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if (!isPasswordValid) {
            throw new Error('Senha inválida.');
        }

        const token = this.jwtService.sign({
            sub: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email
        });

        const payload = JSON.parse(
            Buffer.from(token.split(".")[1], "base64url").toString()
        );

        return { 
            access_token: token, 
            payload: payload
        };


    }
}