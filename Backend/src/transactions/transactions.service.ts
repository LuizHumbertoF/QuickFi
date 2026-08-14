import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { CreateTransactionDto } from "./dto/createTransaction.dto.js";

@Injectable()
export class TransactionsService {
    constructor(private prisma: PrismaService) {}

    async getTransactions(userId: number) {

        const accounts = await this.prisma.account.findMany({
            where: {
                userId
            }
        });

        const accountTransactions = await Promise.all(
            accounts.map(async (account) => {

                const transactions =
                    await this.prisma.transaction.findMany({
                        where: {
                            accountId: account.id
                        }
                    });

                return {
                    account,
                    transactions
                };
            })
        );

        return accountTransactions;
    }

    async createTransaction(
    data: CreateTransactionDto,
    userId: number
) {

    const account = await this.prisma.account.findUnique({
            where: {
                userId_name: {
                    userId,
                    name: data.account
                }
            }
        });

        if (!account) {
            throw new NotFoundException(
                "Conta não encontrada."
            );
        }

        const numberAmount = Number(data.amount);

        const newTransaction =
            await this.prisma.transaction.create({
                data: {
                    amount: numberAmount,
                    type: data.type,
                    category: data.category,
                    description: data.description,
                    recurrentTransaction: data.recurrent,
                    accountId: account.id,
                    transactionDate: data.transactionDate,

                    ...(data.paymentType && {
                        paymentType: data.paymentType
                    })
                }
            });

        return newTransaction;
    }
}