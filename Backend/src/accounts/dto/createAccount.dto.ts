import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAccountDto {
  
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    type!: string;

    @IsNotEmpty()
    color!: string;

    @IsNumber()
    amount!: string;

    @IsBoolean()
    active!: boolean;

    @IsOptional()
    @IsString()
    institution?: string;

    
}