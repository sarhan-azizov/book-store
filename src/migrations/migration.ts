import { DataSource } from 'typeorm';

import { DOTENV } from '../configs';
import { InitTables1673384735839 } from './init-bables-1673384735839';
import { CityEntity } from '../modules';

export const migrationDataSource = new DataSource({
  type: 'postgres',
  host: DOTENV.database.host,
  port: DOTENV.database.port,
  username: DOTENV.database.user,
  password: DOTENV.database.password,
  database: DOTENV.database.database,
  entities: [CityEntity],
  migrations: [InitTables1673384735839],
});
