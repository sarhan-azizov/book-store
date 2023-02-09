import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { CategoryEntity } from './entities';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoriesProfile } from './categories.profile';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesProfile],
  exports: [],
})
export class CategoriesModule {}
