import { FileValidator } from '@nestjs/common';

export class CustomUploadValidator extends FileValidator<{ allowedTypes: string[] }> {
    
    // Melhora a mensagem de erro para o usuário final
    buildErrorMessage(): string {
        return `Formato inválido. Tipos permitidos: ${this.validationOptions.allowedTypes.join(', ')}`;
    }

    // Checa se o mimetype contém algum dos formatos da nossa lista
    isValid(file: Express.Multer.File): boolean {
        if (!file || !file.mimetype) return false;
        
        return this.validationOptions.allowedTypes.some((type) => 
            file.mimetype.includes(type)
        );
    }
}