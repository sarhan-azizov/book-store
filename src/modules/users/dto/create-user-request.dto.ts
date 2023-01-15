import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber,
  MaxLength,
  Min,
  Max,
} from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { IsUUID } from 'class-validator';

export class CreateUserRequestDTO {
  @ApiProperty({ required: true, type: 'string', maxLength: 120 })
  @AutoMap()
  @MaxLength(120)
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ required: true, type: 'string', maxLength: 120 })
  @AutoMap()
  @MaxLength(120)
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ required: true, type: 'string', maxLength: 60 })
  @AutoMap()
  @MaxLength(60)
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ required: true, type: 'number', maxLength: 1 })
  @AutoMap()
  @Min(0)
  @Max(1)
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

  @ApiProperty({ required: true, type: 'string', maxLength: 15 })
  @AutoMap()
  @MaxLength(15)
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ required: true, type: 'string', maxLength: 120 })
  @AutoMap()
  @MaxLength(120)
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
