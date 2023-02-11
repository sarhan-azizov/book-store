import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

class MetaDataResponseDTO {
  @ApiProperty({
    type: 'number',
    required: true,
  })
  pages: number;

  @ApiProperty({
    type: 'number',
    required: true,
  })
  perPage: number;

  @ApiProperty({
    type: 'number',
    required: true,
  })
  itemsCount: number;
}

export class CommonPaginationResponseDTO<T> {
  @IsArray()
  @ApiProperty({ required: true })
  data: T[];

  @ApiProperty({ required: true, type: () => CommonPaginationResponseDTO })
  metaData: MetaDataResponseDTO;
}
