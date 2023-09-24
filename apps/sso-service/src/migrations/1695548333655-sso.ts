import { MigrationInterface, QueryRunner } from "typeorm";

export class Sso1695548333655 implements MigrationInterface {
    name = 'Sso1695548333655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "login" DROP COLUMN "user_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "login"
            ADD "user_id" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "login" DROP COLUMN "user_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "login"
            ADD "user_id" integer NOT NULL
        `);
    }

}
