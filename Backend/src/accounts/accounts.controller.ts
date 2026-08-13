import { Controller, Body, Get, Post, UseGuards, Request } from '@nestjs/common';
import { CreateAccountDto } from './dto/createAccount.dto.js';
import { AccountsService } from './accounts.service.js';
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard.js";


@Controller('accounts')
export class AccountsController {

    constructor(private accountService: AccountsService) {}

    @UseGuards(JwtAuthGuard)
    @Get() 
    getAccounts(@Request() req: any) {
        return this.accountService.getAccounts(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('newAccount')
    newAccount(@Body() data: CreateAccountDto, @Request() req: any) {
        

        return this.accountService.createAccount(data, req.user.id);

    }

}
