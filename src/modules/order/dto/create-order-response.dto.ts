import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

import { EnumOrderStatus } from '../orders.type';

export class CreateOrderResponseDTO {
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
    format: 'uuid',
  })
  userId: string;

  @AutoMap()
  @ApiProperty({
    required: true,
    type: [String],
  })
  books: string[];

  @AutoMap()
  @ApiProperty({
    required: true,
    type: 'string',
    format: 'uuid',
  })
  departmentStoreId: string;

  @AutoMap()
  @ApiProperty({
    required: true,
    enum: EnumOrderStatus,
  })
  status: EnumOrderStatus;

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
