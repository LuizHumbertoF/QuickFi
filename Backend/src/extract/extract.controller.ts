import { Controller, Request, Body, UseGuards, Post, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { ExtractService } from './extract.service.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomUploadValidator } from './custom-file.validator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';


@Controller('extract')
export class ExtractController {

    constructor(private readonly extractService : ExtractService) {}

    @Post('importExtract')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    newAccount(@UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
                new CustomUploadValidator({ 
                    allowedTypes: ['csv', 'ofx', 'spreadsheetml.sheet', 'pdf'] 
                })
            ]
        })
    ) file: Express.Multer.File, @Body('account') accountName: string, @Request() req: any) {

        return this.extractService.importExtract(file, accountName, req.user.id);

    }

}
