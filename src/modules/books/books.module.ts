import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CitiesProfile } from './cities.profile';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { CityEntity } from './entities';
import { UserEntity } from '../users';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity, UserEntity])],
  controllers: [CitiesController],
  providers: [CitiesService, CitiesProfile],
  exports: [],
})
export class CitiesModule {}
