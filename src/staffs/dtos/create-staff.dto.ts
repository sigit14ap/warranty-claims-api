import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateStaffDto {
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
