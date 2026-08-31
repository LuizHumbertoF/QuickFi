import { Module } from "@nestjs/common";
import { ExtractController } from "./extract.controller.js";
import { ExtractService } from "./extract.service.js";

@Module({
    controllers: [ExtractController],
    providers: [ExtractService]
})
export class ExtractModule {

}