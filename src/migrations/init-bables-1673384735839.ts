import { MigrationInterface, QueryRunner } from 'typeorm';
import { CityEntity } from '../modules';
export class InitTables1673384735839 implements MigrationInterface {
  name = 'InitTables1673384735839';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "CITY" (
        "id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        "name" varchar(120) NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_DATE
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "CLIENT" (
        "id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        "admin" BOOLEAN DEFAULT FALSE,
        "gender" decimal(1) NOT NULL,
        "phone" varchar(15) NOT NULL,
        "email" varchar(120) NOT NULL,
        "firstName" varchar(120) NOT NULL,
        "lastName" varchar(120) NOT NULL,
        "cityId" uuid NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_DATE
      )`,
    );

    await queryRunner.query(
      `ALTER TABLE "CLIENT" ADD CONSTRAINT "CLIENT_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "CITY"("id")`,
    );

    await queryRunner.manager.insert(
      CityEntity,
      Object.assign(new CityEntity(), {
        name: 'sarhan',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "CLIENT" DROP CONSTRAINT "CLIENT_cityId_fkey"`,
    );
    await queryRunner.query(`DROP TABLE "CITY"`);
    await queryRunner.query(`DROP TABLE "CLIENT"`);
  }
}
