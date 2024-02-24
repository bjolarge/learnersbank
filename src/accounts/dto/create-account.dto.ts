import { IsNumber, IsPositive, IsString } from "class-validator";

export class CreateAccountDto {
    @IsNumber()
    accountNumber:number;
    @IsString()
    accountName:string;
    // @IsNumber()
    // balance:number;
    @IsNumber()
    @IsPositive()
    deposit:number;
}
