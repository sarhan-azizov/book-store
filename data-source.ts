import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { DOTENV } from './src/configs';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  port: DOTENV.database.port,
  username: DOTENV.database.user,
  password: DOTENV.database.password,
  database: DOTENV.database.database,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  seeds: [join(__dirname, '**', '*.seed.{ts,js}')],
  factories: [join(__dirname, '**', '*.factory.{ts,js}')],
};

export const dataSource = new DataSource(options);
