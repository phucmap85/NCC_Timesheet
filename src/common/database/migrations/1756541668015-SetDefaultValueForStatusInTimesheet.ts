import { MigrationInterface, QueryRunner } from "typeorm";

export class SetDefaultValueForStatusInTimesheet1756541668015 implements MigrationInterface {
    name = 'SetDefaultValueForStatusInTimesheet1756541668015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheets\` CHANGE \`status\` \`status\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheets\` CHANGE \`status\` \`status\` int NOT NULL`);
    }

}
