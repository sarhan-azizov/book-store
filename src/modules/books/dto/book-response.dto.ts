import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

import { CreateBookRequestDto } from './create-book-request.dto';

export class BookResponseDto extends CreateBookRequestDto {
  @ApiProperty({
    required: true,
    type: 'string',
    example: '50d46b4d-aa5b-4fbd-88ed-9fa1c44e6a54',
    format: 'uuid',
  })
  @AutoMap()
  id: string;

  @ApiProperty({
    required: true,
    type: 'string',
    example: '2022-11-28T16:57:34.356Z',
  })
  @AutoMap()
  createdAt: Date;

  @ApiProperty({
    required: true,
    type: 'string',
    example: '2022-11-28T16:57:34.356Z',
  })
  @AutoMap()
  updatedAt: Date;
}
