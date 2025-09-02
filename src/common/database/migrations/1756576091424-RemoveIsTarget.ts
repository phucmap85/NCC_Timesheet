import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveIsTarget1756576091424 implements MigrationInterface {
    name = 'RemoveIsTarget1756576091424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheets\` DROP COLUMN \`isTarget\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheets\` ADD \`isTarget\` tinyint NOT NULL DEFAULT '0'`);
    }

}
