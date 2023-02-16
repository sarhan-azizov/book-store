import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
  IsUUID,
} from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderRequestDTO {
  @AutoMap()
  @ApiProperty({
    required: true,
    type: 'string',
    example: '50d46b4d-aa5b-4fbd-88ed-9fa1c44e6a54',
    format: 'uuid',
  })
  @IsUUID('4')
  @IsString()
  @IsNotEmpty()
  storeDepartment: string;

  @AutoMap()
  @ApiProperty({
    required: true,
    example: ['50d46b4d-aa5b-4fbd-88ed-9fa1c44e6a54'],
  })
  @IsUUID('4', { each: true })
  @ArrayMinSize(1)
  @IsArray()
  books: string[];
}
