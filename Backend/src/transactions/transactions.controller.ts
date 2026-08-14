import { Controller, Body, Get, Post, UseGuards, Request } from '@nestjs/common';
import { CreateTransactionDto } from './dto/createTransaction.dto.js';
import { TransactionsService } from './transactions.service.js';
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard.js";


@Controller('transactions')
export class TransactionsController {

    constructor(private transactionService: TransactionsService) {}

    @UseGuards(JwtAuthGuard)
    @Get() 
    getTransactions(@Request() req: any) {
        return this.transactionService.getTransactions(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('newTransaction')
    newAccount(@Body() data: CreateTransactionDto, @Request() req: any) {
        

        return this.transactionService.createTransaction(data, req.user.id);

    }

}
