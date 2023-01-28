import { MigrationInterface, QueryRunner } from 'typeorm';

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
      `CREATE TABLE IF NOT EXISTS "USER" (
        "id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        "admin" BOOLEAN NOT NULL DEFAULT FALSE,
        "gender" decimal(1) NOT NULL,
        "phone" varchar(15) NOT NULL,
        "email" varchar(120) NOT NULL,
        "firstName" varchar(120) NOT NULL,
        "password" varchar(60) NOT NULL,
        "lastName" varchar(120) NOT NULL,
        "cityId" uuid NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_DATE
      )`,
    );

    await queryRunner.query(
      `ALTER TABLE "USER" ADD CONSTRAINT "CITY_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "CITY"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "USER_email_key" ON "USER" ("email")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "USER" DROP CONSTRAINT "CITY_cityId_fkey"`,
    );
    await queryRunner.query(`DROP TABLE "CITY"`);
    await queryRunner.query(`DROP TABLE "USER"`);
  }
}
