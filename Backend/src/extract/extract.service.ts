import { Injectable } from "@nestjs/common";
import type { ImportExtractDto } from "./dto/importExtract.dto.js";
import { csvReader } from "./readers/csv.reader.js";


@Injectable()
export class ExtractService {
    importExtract(file: Express.Multer.File) {
        console.log(file);

        if(file.mimetype === "text/csv") {
            const content = file.buffer.toString('utf-8');

            csvReader(content);
        }
        else {
            return file;
        }
    }
}