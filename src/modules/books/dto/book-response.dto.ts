import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

import { CreateBookRequestDto } from './create-book-request.dto';

export class BookResponseDTO extends CreateBookRequestDto {
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
  })
  @AutoMap()
  language: any;

  @ApiProperty({
    required: true,
  })
  @AutoMap()
  authors: any[];

  @ApiProperty({
    required: true,
  })
  @AutoMap()
  categories: any[];

  @ApiProperty({
    required: true,
    type: 'string',
    example: 'Фантастические твари и где они обитают.',
  })
  @AutoMap()
  title: string;

  @ApiProperty({
    required: true,
    type: 'string',
  })
  @AutoMap()
  description: string;

  @ApiProperty({
    required: true,
    type: 'number',
  })
  @AutoMap()
  cost: number;

  @ApiProperty({
    required: true,
    type: 'number',
  })
  @AutoMap()
  pages: number;

  @ApiProperty({
    required: true,
    type: 'string',
    example: '2022-11-28T16:57:34.356Z',
  })
  @AutoMap()
  publicationDate: Date;

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
