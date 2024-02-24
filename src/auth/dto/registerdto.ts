import {IsEmail, IsNotEmpty, IsString, Matches, MinLength} from 'class-validator';
export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}