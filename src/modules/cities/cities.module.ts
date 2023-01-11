import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CitiesProfile } from './cities.profile';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { CityEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity])],
  controllers: [CitiesController],
  providers: [CitiesService, CitiesProfile],
  exports: [],
})
export class CitiesModule {}
