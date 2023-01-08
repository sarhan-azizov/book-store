import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitTables1668792815469 implements MigrationInterface {
  name = 'InitTables1668792815469';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "data_sources"
      (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
        "name" character varying NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now()
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "data_sources"`);
  }
}
