import { Controller, Get } from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

import { Roles, EnumRoles } from '@/common';

import { BookResponseDTO } from './dto';
import { BooksService } from './books.service';
import { BookEntity } from './entities';

@ApiTags('Books')
@Controller('books')
@ApiBearerAuth()
export class BooksController {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly booksService: BooksService,
  ) {}

  @Get('/')
  @Roles([EnumRoles.USER])
  @ApiOperation({ summary: 'return books' })
  @ApiResponse({
    status: 200,
    description: 'Return books',
    type: BookResponseDTO,
  })
  async getBooks(): Promise<BookResponseDTO[]> {
    try {
      const foundBooks = await this.booksService.getBooks();

      return this.mapper.mapArray(foundBooks, BookEntity, BookResponseDTO);
    } catch (e) {
      throw e;
    }
  }
}
