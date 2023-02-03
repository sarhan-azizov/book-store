import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class CreateBookRequestDto {
  @ApiProperty({ required: true, type: 'string', maxLength: 120 })
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  name: string;
}
