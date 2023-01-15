import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, MaxLength } from 'class-validator';

export class AuthRequestDTO {
  @ApiProperty({ required: true, type: 'string', maxLength: 120 })
  @MaxLength(120)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, type: 'string', maxLength: 60 })
  @MaxLength(60)
  @IsNotEmpty()
  @IsString()
  password: string;
}
