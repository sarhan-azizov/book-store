import { MigrationInterface, QueryRunner } from 'typeorm';
import { CitiesSeed } from '../modules';

export class Seeds1673384735839 implements MigrationInterface {
  name = 'Seeds1673384735839';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await CitiesSeed(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.resolve();
  }
}
