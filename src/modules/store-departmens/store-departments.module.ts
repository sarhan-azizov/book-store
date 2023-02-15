import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { StoreDepartmentsEntity } from './entities';
import { StoreDepartmentsService } from './store-departments.service';
import { StoreDepartmentsController } from './store-departments.controller';
import { StoreDepartmentsProfile } from './store-departments.profile';

@Module({
  imports: [TypeOrmModule.forFeature([StoreDepartmentsEntity])],
  controllers: [StoreDepartmentsController],
  providers: [StoreDepartmentsService, StoreDepartmentsProfile],
  exports: [],
})
export class StoreDepartmentsModule {}
