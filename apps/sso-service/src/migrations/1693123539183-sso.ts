import { MigrationInterface, QueryRunner } from "typeorm";

export class Sso1693123539183 implements MigrationInterface {
    name = 'Sso1693123539183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "onboarding" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "id" SERIAL NOT NULL,
                "cuurent_state" character varying NOT NULL DEFAULT 'CHECK_ACCOUNT',
                CONSTRAINT "PK_b8b6cfe63674aaee17874f033cf" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "onboarding"
        `);
    }

}
