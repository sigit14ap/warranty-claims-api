import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginStaffDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
