import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ description: 'The email of the register form' })
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @ApiProperty({ description: 'The name of the register form' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'The password of the register form' })
    @IsString()
    @IsNotEmpty()
    password: string;
}
