import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

import { BookResponseDTO } from './dto';
import { BooksService } from './books.service';
import { BookEntity } from './entities';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly booksService: BooksService,
  ) {}

  @Get('/')
  @ApiOperation({ summary: 'return books' })
  @ApiResponse({
    status: 200,
    description: 'Return books',
    type: BookResponseDTO,
  })
  async getBooks(): Promise<BookResponseDTO[]> {
    const foundBooks = await this.booksService.getBooks();

    return this.mapper.mapArray(foundBooks, BookEntity, BookResponseDTO);
  }
}
