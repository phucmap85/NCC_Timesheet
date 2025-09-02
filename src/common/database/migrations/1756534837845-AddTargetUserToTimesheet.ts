import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTargetUserToTimesheet1756534837845 implements MigrationInterface {
    name = 'AddTargetUserToTimesheet1756534837845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheets\` ADD \`isTarget\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheets\` DROP COLUMN \`isTarget\``);
    }

}
