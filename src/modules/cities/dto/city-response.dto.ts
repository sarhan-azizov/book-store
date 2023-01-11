import { ApiProperty } from '@nestjs/swagger';

import { CreateCityRequestDTO } from './create-city-request.dto';

export class CityResponseDTO extends CreateCityRequestDTO {
  @ApiProperty({
    required: true,
    type: 'string',
    example: '50d46b4d-aa5b-4fbd-88ed-9fa1c44e6a54',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    required: true,
    type: 'string',
    example: '2022-11-28T16:57:34.356Z',
  })
  created_at: Date;

  @ApiProperty({
    required: true,
    type: 'string',
    example: '2022-11-28T16:57:34.356Z',
  })
  updated_at: Date;
}
