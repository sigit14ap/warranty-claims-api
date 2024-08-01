import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterCustomerDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
