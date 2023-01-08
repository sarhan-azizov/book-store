import { ApiProperty } from '@nestjs/swagger';

export class CreateDataSourceRequestDTO {
  @ApiProperty({ required: true, type: 'string', maxLength: 200 })
  name: string;
}
