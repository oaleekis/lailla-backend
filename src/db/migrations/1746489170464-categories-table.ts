import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoriesTable1746489170464 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "categories" (
              "id" UUID NOT NULL DEFAULT gen_random_uuid(),
              "userId" UUID NULL,
              "name" VARCHAR(255) NOT NULL,
              "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              "deletedAt" TIMESTAMP,
              CONSTRAINT "PK_categories_id" PRIMARY KEY ("id"),
              CONSTRAINT "FK_categories_userId" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
            );
          `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "categories";`);
    }

}
