import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class CommonPaginationRequestDTO {
  @ApiProperty({
    required: false,
    type: 'number',
    default: 1,
  })
  @Type(() => Number)
  @Min(1)
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiProperty({
    required: false,
    type: 'number',
    default: 10,
  })
  @Type(() => Number)
  @Min(1)
  @Max(50)
  @IsNumber()
  @IsOptional()
  perPage: number;
}
