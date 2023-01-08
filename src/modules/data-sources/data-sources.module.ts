import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSourcesController } from './data-sources.controller';
import { DataSourceEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([DataSourceEntity])],
  controllers: [DataSourcesController],
  providers: [],
  exports: [],
})
export class DataSourcesModule {}
