import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AuthorEntity } from './entities';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { AuthorsProfile } from './authors.profile';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity])],
  controllers: [AuthorsController],
  providers: [AuthorsService, AuthorsProfile],
  exports: [],
})
export class AuthorsModule {}
