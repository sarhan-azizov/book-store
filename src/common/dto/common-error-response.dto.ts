import { ApiProperty } from '@nestjs/swagger';

export class CommonErrorResponseDTO {
  @ApiProperty({ required: true, type: 'string', example: '/cities' })
  path: string;

  @ApiProperty({ required: true, type: 'number', example: '404' })
  statusCode: number;

  @ApiProperty({
    required: true,
    type: 'string',
    example: 'Conflict',
  })
  error: string;

  @ApiProperty({
    required: true,
    type: 'string',
    example: 'The Data Source with the name asd is already exists.',
  })
  details: string;

  @ApiProperty({
    required: true,
    type: 'string',
    example: '2022-11-07T08:40:12.323Z',
  })
  timestamp: string;
}
