import { RegisterDto } from "./dto/register.dto.js";
import { PrismaService } from "../prisma/prisma.service.js";
import * as bcrypt from "bcrypt"; // <-- Correção do import
import { Injectable, ConflictException, InternalServerErrorException } from "@nestjs/common";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async register(data: RegisterDto) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { email: data.email }
            });

            if (user) {
                
                throw new ConflictException('Usuário já cadastrado no banco.');
            }
            
            const passwordHash = await bcrypt.hash(data.password, 10);

            await this.prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: passwordHash,
                }
            });
            
            // Retorna um objeto JSON bonitinho
            return { message: 'Cadastro realizado com sucesso!' };

        } catch (error) {
            // Isso vai imprimir a CAUSA REAL do erro 500 no seu terminal!
            console.error("ERRO REAL NO REGISTER:", error);
            
            // Caso contrário, lança um erro 500 padrão
            throw new InternalServerErrorException('Erro interno ao tentar registrar usuário.');
        }
    }
}