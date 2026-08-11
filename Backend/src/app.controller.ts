import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
    
    @Get()
    getBasic() {
        return "QuickFi API funcionando!";
    }
}