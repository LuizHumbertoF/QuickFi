import { Injectable, ConflictException, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { CreateAccountDto } from "./dto/createAccount.dto.js";

@Injectable()
export class AccountsService {
    constructor(private prisma: PrismaService) {}

    async getAccounts(userId: number) {

        const accounts = await this.prisma.account.findMany({
            where: {
                userId: userId
            }
        });

        return accounts;
    }

    async createAccount(data: CreateAccountDto, userId: number) {

        const account = await this.prisma.account.findFirst({
            where: {
                name: data.name,
                userId: userId
            }
        });

        if (account) {
            
            throw new ConflictException('Você já possui uma conta com esse nome.');
        }

        const numberAmount = Number(data.amount);

        const newAccount = await this.prisma.account.create({
            data: {
                name: data.name,
                type: data.type,
                color: data.color,
                amount: numberAmount,
                active: data.active,
                userId: userId,

                ...(data.institution && {
                    institution: data.institution
                })
            }
        });

        return newAccount;
    }
}