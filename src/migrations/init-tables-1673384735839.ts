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
      `CREATE TABLE IF NOT EXISTS "LANGUAGE" (
        "id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        "name" varchar(20) NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_DATE
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "AUTHOR" (
        "id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        "firstName" varchar(120) NOT NULL,
        "lastName" varchar(120) NOT NULL,
        "description" varchar(1000) NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_DATE
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "CATEGORY" (
        "id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        "name" varchar(120) NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_DATE
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "BOOK_AUTHOR" (
        "bookId" uuid NOT NULL,
        "authorId" uuid NOT NULL,
        CONSTRAINT "BOOK_AUTHOR_id_pkey" PRIMARY KEY ("bookId", "authorId")
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "BOOK_CATEGORY" (
        "bookId" uuid NOT NULL,
        "categoryId" uuid NOT NULL,
        CONSTRAINT "BOOK_CATEGORY_id_pkey" PRIMARY KEY ("bookId", "categoryId")
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "BOOK" (
        "id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        "languageId" uuid NOT NULL,
        "title" varchar(120) NOT NULL,
        "description" varchar(2500) NOT NULL,
        "publicationDate" DATE NOT NULL,
        "cost" MONEY NOT NULL,
        "pages" SMALLINT NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_DATE
      )`,
    );

    await queryRunner.query(
      `ALTER TABLE "BOOK_AUTHOR" ADD CONSTRAINT "BOOK_AUTHOR_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "AUTHOR"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "BOOK_AUTHOR" ADD CONSTRAINT "BOOK_AUTHOR_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "BOOK"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "BOOK_CATEGORY" ADD CONSTRAINT "BOOK_CATEGORY_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CATEGORY"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "BOOK_CATEGORY" ADD CONSTRAINT "BOOK_CATEGORY_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "BOOK"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "BOOK" ADD CONSTRAINT "BOOK_LANGUAGE_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "LANGUAGE"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "USER" ADD CONSTRAINT "CITY_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "CITY"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "USER_email_key" ON "USER" ("email")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "LANGUAGE_name_key" ON "LANGUAGE" ("name")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "CATEGORY_name_key" ON "CATEGORY" ("name")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "USER" DROP CONSTRAINT "CITY_cityId_fkey"`,
    );
    await queryRunner.query(`DROP TABLE "CITY"`);
    await queryRunner.query(`DROP TABLE "USER"`);
    await queryRunner.query(`DROP TABLE "LANGUAGE"`);
    await queryRunner.query(`DROP TABLE "AUTHOR"`);
    await queryRunner.query(`DROP TABLE "CATEGORY"`);
    await queryRunner.query(`DROP TABLE "BOOK_AUTHOR"`);
    await queryRunner.query(`DROP TABLE "BOOK_CATEGORY"`);
    await queryRunner.query(`DROP TABLE "BOOK"`);
  }
}
