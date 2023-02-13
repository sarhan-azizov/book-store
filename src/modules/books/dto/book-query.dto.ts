import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { CommonPaginationRequestDTO } from '@/common/dto';

export class BookQueryDTO extends CommonPaginationRequestDTO {
  @ApiProperty({
    type: 'string',
    required: false,
    description: 'Example UUID4: 50d46b4d-aa5b-4fbd-88ed-9fa1c44e6a54',
  })
  @IsOptional()
  @IsString()
  languages: string;

  @ApiProperty({
    type: 'string',
    required: false,
    description: 'Example UUID4: 50d46b4d-aa5b-4fbd-88ed-9fa1c44e6a54',
  })
  @IsOptional()
  @IsString()
  authors: string;

  @ApiProperty({
    type: 'string',
    required: false,
    description:
      'Example UUID4: 50d46b4d-aa5b-4fbd-88ed-9fa1c44e6a54, 50d46b4d-aa5b-4fbd-88ed-9fa1c44e6a54',
  })
  @IsOptional()
  @IsString()
  categories: string;

  @ApiProperty({
    type: 'string',
    required: false,
    description: 'Example: SKU-1,SKU-2 or Harry Potter',
  })
  @IsOptional()
  @IsString()
  search: string;
}
