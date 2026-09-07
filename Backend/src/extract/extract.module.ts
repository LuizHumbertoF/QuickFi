import { Module } from "@nestjs/common";
import { ExtractController } from "./extract.controller.js";
import { ExtractService } from "./extract.service.js";
import { AccountsModule } from "../accounts/accounts.module.js";
import { PrismaModule } from "../prisma/prisma.module.js";

@Module({
    imports: [PrismaModule ,AccountsModule],
    controllers: [ExtractController],
    providers: [ExtractService]
})
export class ExtractModule { }