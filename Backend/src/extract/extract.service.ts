import { Injectable } from "@nestjs/common";
import type { ImportExtractDto } from "./dto/importExtract.dto.js";
import { csvReader } from "./readers/csv.reader.js";
import type { ImportTransaction } from "./readers/csv.reader.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { AccountsService } from "../accounts/accounts.service.js";

@Injectable()
export class ExtractService {

    constructor(
        private prisma: PrismaService,
        private readonly accountsService: AccountsService
    ) {}

    async importExtract(file: Express.Multer.File, accountName: string, userId: number) {
        console.log(file);

        if(file.mimetype === "text/csv") {
            const content = file.buffer.toString('utf-8');

            const importTransactions: ImportTransaction[] = csvReader(content);

            try {
                let existingAccount = await this.accountsService.getAccount(accountName, userId);

                if(!existingAccount) {
                    const possibleAccountColors = ["green", "purple", "orange", "blue", "pink", "red", "gray"];
                    const formattedAccountName = accountName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    let accountColor = "";

                    if(/\bnubank\b/.test(formattedAccountName)) {
                        accountColor = "purple";
                    } else if(/\bbanco do brasil\b/.test(formattedAccountName)) {
                        accountColor = "orange";
                    } else if(/\bsantander\b/.test(formattedAccountName)) {
                        accountColor = "red";
                    } else if(/\bcaixa\b/.test(formattedAccountName)) {
                        accountColor = "blue";
                    } else if(/\bsicoob\b/.test(formattedAccountName)) {
                        accountColor = "gray";
                    } else if(/\bitau\b/.test(formattedAccountName)) {
                        accountColor = "blue";
                    } else {
                        const randomColorIndexNumber = Math.floor(Math.random() * (possibleAccountColors.length - 1 + 1)) + 1;
                        accountColor = possibleAccountColors[randomColorIndexNumber - 1];
                    }

                    existingAccount = await this.accountsService.createAccount({
                        name: accountName,
                        type: "corrente",
                        color: accountColor,
                        active: true,
                        amount: importTransactions[0].balance
                    }, userId);
                }

                const newImport = await this.prisma.import.create({
                    data: {
                        fileName: file.originalname,
                        status: "pending",
                        accountId: existingAccount.id
                    }
                });

                // 1. Filtra as transações para remover lixos do rodapé/cabeçalho do banco
                const transacoesLimpas = importTransactions.filter(transaction => {
                    // Só aceita a transação se o 'amount' NÃO for NaN
                    // E se a data for válida (ex: não estiver vazia e tiver o tamanho de "YYYY-MM-DD")
                    const isAmountValid = !Number.isNaN(transaction.amount);
                    const isDateValid = transaction.date && transaction.date.length === 10;
                    
                    return isAmountValid && isDateValid;
                });

                const transacoesComImportId = transacoesLimpas.map(transaction => ({
                    ...transaction, 
                    importId: newImport.id 
                }));

                const importTransactionsDB = await this.prisma.importTransaction.createMany({
                    data: transacoesComImportId
                });

                return importTransactionsDB;
            }
            catch(e) {
                console.log("Erro ao criar transações importadas", e);
                throw e;
            }
        }
        else {
            console.log("Não é um arquivo .csv .");
        }



    }
}