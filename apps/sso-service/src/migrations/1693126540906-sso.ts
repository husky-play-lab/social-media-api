import { MigrationInterface, QueryRunner } from "typeorm";

export class Sso1693126540906 implements MigrationInterface {
    name = 'Sso1693126540906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "onboarding"
            ADD "email" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "onboarding" DROP COLUMN "email"
        `);
    }

}
