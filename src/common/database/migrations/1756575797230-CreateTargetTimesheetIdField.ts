import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTargetTimesheetIdField1756575797230 implements MigrationInterface {
    name = 'CreateTargetTimesheetIdField1756575797230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheets\` ADD \`targetTimesheetId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`timesheets\` ADD CONSTRAINT \`FK_464daa05a35f3026f767d942703\` FOREIGN KEY (\`targetTimesheetId\`) REFERENCES \`timesheets\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheets\` DROP FOREIGN KEY \`FK_464daa05a35f3026f767d942703\``);
        await queryRunner.query(`ALTER TABLE \`timesheets\` DROP COLUMN \`targetTimesheetId\``);
    }

}
