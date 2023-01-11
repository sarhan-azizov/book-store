import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCityRequestDTO {
  @ApiProperty({ required: true, type: 'string', maxLength: 120 })
  @IsNotEmpty()
  @IsString()
  name: string;
}
