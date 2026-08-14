import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config"; 
import { AppController } from "./app.controller.js";
import { AuthModule } from "./auth/auth.module.js";
import { AccountsModule } from "./accounts/accounts.module.js";
import { TransactionsModule } from "./transactions/transactions.module.js";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }), 
        AuthModule,
        AccountsModule,
        TransactionsModule
    ],
    controllers: [AppController],
    providers: [],
    exports: [],
})
export class AppModule {}