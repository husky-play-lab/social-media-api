import { MigrationInterface, QueryRunner } from "typeorm";

export class Sso1693123575296 implements MigrationInterface {
    name = 'Sso1693123575296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "onboarding"
                RENAME COLUMN "cuurent_state" TO "current_state"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "onboarding"
                RENAME COLUMN "current_state" TO "cuurent_state"
        `);
    }

}
