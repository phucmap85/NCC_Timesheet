import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeDateTypeForWorkingTime1756546806376 implements MigrationInterface {
    name = 'ChangeDateTypeForWorkingTime1756546806376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheets\` DROP COLUMN \`workingTime\``);
        await queryRunner.query(`ALTER TABLE \`timesheets\` ADD \`workingTime\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheets\` DROP COLUMN \`workingTime\``);
        await queryRunner.query(`ALTER TABLE \`timesheets\` ADD \`workingTime\` decimal(5,2) NOT NULL`);
    }

}
