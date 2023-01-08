import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DOTENV } from './configs';
import { HealthModule, DataSourcesModule } from './modules';

@Module({
  imports: [
    HealthModule,
    DataSourcesModule,
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
