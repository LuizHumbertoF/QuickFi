import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config"; 
import { AppController } from "./app.controller.js";
import { AuthModule } from "./auth/auth.module.js";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }), 
        AuthModule
    ],
    controllers: [AppController],
    providers: [],
    exports: [],
})
export class AppModule {}