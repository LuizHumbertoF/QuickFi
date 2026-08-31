import { Controller, Body, Post } from '@nestjs/common';
import { ImportExtractDto } from './dto/importExtract.dto.js';


@Controller('extract')
export class ExtractController {

    @Post('importExtract')
    newAccount(@Body() data: ImportExtractDto, @Request() req: any) {
        

        return this.transactionService.createTransaction(data, req.user.id);

    }

}
