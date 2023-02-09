import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class LanguageResponseDTO {
  @AutoMap()
  @ApiProperty({
    required: true,
    type: 'string',
    example: '50d46b4d-aa5b-4fbd-88ed-9fa1c44e6a54',
    format: 'uuid',
  })
  id: string;

  @AutoMap()
  @ApiProperty({
    required: true,
    type: 'string',
  })
  name: string;

  @AutoMap()
  @ApiProperty({
    required: true,
    type: 'string',
    example: '2022-11-28T16:57:34.356Z',
  })
  createdAt: Date;

  @AutoMap()
  @ApiProperty({
    required: true,
    type: 'string',
    example: '2022-11-28T16:57:34.356Z',
  })
  updatedAt: Date;
}
