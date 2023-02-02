import { DataSource } from 'typeorm';

import { DOTENV } from '../configs';
import {
  CityEntity,
  UserEntity,
  AuthorEntity,
  BookEntity,
  CategoryEntity,
  LanguageEntity,
} from '../modules';
import { Seeds1673384735839 } from './seeds';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
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
  migrations: [Seeds1673384735839],
});
