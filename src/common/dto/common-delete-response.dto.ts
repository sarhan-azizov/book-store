import { ApiProperty } from '@nestjs/swagger';

export class CommonDeleteResponseDTO {
  @ApiProperty({ required: true, type: 'any', example: '[]' })
  row: any;

  @ApiProperty({ required: true, type: 'number', example: '1' })
  affected: number;
}
