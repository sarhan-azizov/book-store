import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthResponseDTO {
  @ApiProperty({ required: true, type: 'string' })
  @IsNotEmpty()
  @IsString()
  access_token: string;
}
