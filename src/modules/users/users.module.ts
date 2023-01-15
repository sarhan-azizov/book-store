import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersProfile } from './users.profile';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './entities';
import { CityEntity } from '../cities';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, CityEntity])],
  controllers: [UsersController],
  providers: [UsersService, UsersProfile],
  exports: [UsersService],
})
export class UsersModule {}
