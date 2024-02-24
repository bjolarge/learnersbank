import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateAccountDepositDto{
    @IsNumber()
    @IsNotEmpty()
    deposit:number
}