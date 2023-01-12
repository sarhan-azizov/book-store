import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { IsUUID } from 'class-validator';


export class CreateUserRequestDTO {
  @ApiProperty({ required: true, type: 'string', maxLength: 120 })
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ required: true, type: 'string', maxLength: 120 })
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ required: true, type: 'number', maxLength: 1 })
  @AutoMap()
  @IsNotEmpty()
  @IsNumber()
  gender: number;

  @ApiProperty({
    example: '0312ac8e-4278-4872-be08-449003b93f95',
    format: 'uuid',
  })
  @AutoMap()
  @IsUUID()
  cityId: string;

  @ApiProperty({ required: true, type: 'string', maxLength: 10 })
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ required: true, type: 'string', maxLength: 10 })
  @AutoMap()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
