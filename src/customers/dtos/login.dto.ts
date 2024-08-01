import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginCustomerDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
