import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterStaffDto {
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
