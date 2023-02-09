import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { LanguageEntity } from './entities';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { LanguagesProfile } from './languages.profile';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageEntity])],
  controllers: [LanguagesController],
  providers: [LanguagesService, LanguagesProfile],
  exports: [],
})
export class LanguagesModule {}
