import { DataSource } from 'typeorm';

import { DataSourceEntity } from '../../modules/data-sources/entities';

import { InitTables1668792815469 as InitTables } from '..';

export const migrationDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [DataSourceEntity],
  migrations: [InitTables],
});
