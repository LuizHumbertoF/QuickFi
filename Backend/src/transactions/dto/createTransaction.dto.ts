import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTransactionDto {
    
    @IsNumber()
    amount!: number;

    @IsNotEmpty()
    type!: string;

    @IsNotEmpty()
    category!: string;

    @IsNotEmpty()
    account!: string;

    @IsNotEmpty()
    description!: string;

    @IsBoolean()
    recurrent!: boolean;

    @IsOptional()
    @IsString()
    paymentType?: string;

    @IsNotEmpty()
    @IsString()
    transactionDate!: string;
    
}