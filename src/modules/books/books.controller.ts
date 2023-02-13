import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

import {
  Roles,
  EnumRoles,
  CommonPaginationResponseDTO,
  CustomBusinessException,
  EnumModules,
} from '@/common';

import { BookResponseDTO, BookQueryDTO } from './dto';
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
    type: CommonPaginationResponseDTO,
  })
  async getBooks(
    @Query() query: BookQueryDTO,
  ): Promise<CommonPaginationResponseDTO<BookResponseDTO>> {
    try {
      const foundBooks = await this.booksService.getBooks(query);

      return {
        data: this.mapper.mapArray(
          foundBooks.data,
          BookEntity,
          BookResponseDTO,
        ),
        metaData: foundBooks.metaData,
      };
    } catch (e) {
      throw e;
    }
  }

  @Get('/:bookId')
  @Roles([EnumRoles.USER])
  @ApiOperation({ summary: 'return a book' })
  @ApiResponse({
    status: 200,
    description: 'Return a book',
    type: BookResponseDTO,
  })
  async getBook(
    @Param('bookId', new ParseUUIDPipe({ version: '4' })) bookId: string,
  ): Promise<BookResponseDTO> {
    try {
      const foundBook = await this.booksService.getBook(bookId);

      if (!foundBook) {
        throw new CustomBusinessException(
          `the book was not found by id: ${bookId}`,
          EnumModules.BOOK,
          HttpStatus.NOT_FOUND,
        );
      }

      return this.mapper.map(foundBook, BookEntity, BookResponseDTO);
    } catch (e) {
      throw e;
    }
  }
}
