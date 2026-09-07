import { Controller, Body, Post, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { ExtractService } from './extract.service.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomUploadValidator } from './custom-file.validator.js';


@Controller('extract')
export class ExtractController {

    constructor(private readonly extractService : ExtractService) {}

    @Post('importExtract')
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
    ) file: Express.Multer.File) {
        

        return this.extractService.importExtract(file);

    }

}
