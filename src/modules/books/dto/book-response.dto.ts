import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

import { AuthorsResponseDTO } from '@/modules/authors';
import { CategoriesResponseDTO } from '@/modules/categories';
import { LanguageResponseDTO } from '@/modules/languages';

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
    type: LanguageResponseDTO,
  })
  @AutoMap()
  language: LanguageResponseDTO;

  @ApiProperty({
    required: true,
    type: [AuthorsResponseDTO],
  })
  @AutoMap()
  authors: AuthorsResponseDTO[];

  @ApiProperty({
    required: true,
    type: [CategoriesResponseDTO],
  })
  @AutoMap()
  categories: CategoriesResponseDTO[];

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
