import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

import { DOTENV } from './configs';
import {
  HealthModule,
  CitiesModule,
  UsersModule,
  AuthModule,
  BooksModule,
  LanguagesModule,
  AuthorsModule,
  CategoriesModule,
} from './modules';

@Module({
  imports: [
    HealthModule,
    CitiesModule,
    UsersModule,
    AuthModule,
    BooksModule,
    LanguagesModule,
    AuthorsModule,
    CategoriesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DOTENV.database.host,
      port: DOTENV.database.port,
      username: DOTENV.database.user,
      password: DOTENV.database.password,
      database: DOTENV.database.database,
      logging: DOTENV.database.logging,
      synchronize: DOTENV.database.synchronize,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
