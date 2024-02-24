import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateAccountBalanceDto{
    @IsNumber()
    @IsNotEmpty()
    balance:number
}