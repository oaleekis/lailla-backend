import { MigrationInterface, QueryRunner } from "typeorm";

export class FinancialTable1746489184651 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "financials" (
              "id" UUID NOT NULL DEFAULT gen_random_uuid(),
              "userId" UUID NOT NULL,
              "categoryId" UUID NULL,
              "title" VARCHAR(255) NOT NULL,
              "value" VARCHAR(255) NOT NULL,
              "type" VARCHAR(10) NOT NULL CHECK ("type" IN ('RECEITA', 'DESPESA')),
              "date" TIMESTAMP NOT NULL,
              "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              "deletedAt" TIMESTAMP,
              CONSTRAINT "PK_financials_id" PRIMARY KEY ("id"),
              CONSTRAINT "FK_financials_userId" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE,
              CONSTRAINT "FK_financials_categoryId" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE
            );
          `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "financials";`);
    }

}
