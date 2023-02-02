import { DataSource } from 'typeorm';

import { DOTENV } from '../configs';
import { InitTables1673384735839 } from './init-tables-1673384735839';
import {
  AuthorEntity,
  BookEntity,
  CategoryEntity,
  CityEntity,
  LanguageEntity,
  UserEntity,
} from '../modules';

export default new DataSource({
  type: 'postgres',
  host: DOTENV.database.host,
  port: DOTENV.database.port,
  username: DOTENV.database.user,
  password: DOTENV.database.password,
  database: DOTENV.database.database,
  entities: [
    CityEntity,
    UserEntity,
    AuthorEntity,
    BookEntity,
    CategoryEntity,
    LanguageEntity,
  ],
  migrations: [InitTables1673384735839],
});
