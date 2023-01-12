import { DataSource } from 'typeorm';

import { DOTENV } from '../configs';
import { Seeds1673384735839 } from './seeds';
import { CityEntity, UserEntity } from '../modules';

export default new DataSource({
  type: 'postgres',
  host: DOTENV.database.host,
  port: DOTENV.database.port,
  username: DOTENV.database.user,
  password: DOTENV.database.password,
  database: DOTENV.database.database,
  entities: [CityEntity, UserEntity],
  migrations: [Seeds1673384735839],
});
