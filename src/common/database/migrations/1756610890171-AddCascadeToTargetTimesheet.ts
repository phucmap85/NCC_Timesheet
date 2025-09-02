import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascadeToTargetTimesheet1756610890171 implements MigrationInterface {
    name = 'AddCascadeToTargetTimesheet1756610890171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheets\` DROP FOREIGN KEY \`FK_464daa05a35f3026f767d942703\``);
        await queryRunner.query(`ALTER TABLE \`timesheets\` ADD CONSTRAINT \`FK_464daa05a35f3026f767d942703\` FOREIGN KEY (\`targetTimesheetId\`) REFERENCES \`timesheets\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheets\` DROP FOREIGN KEY \`FK_464daa05a35f3026f767d942703\``);
        await queryRunner.query(`ALTER TABLE \`timesheets\` ADD CONSTRAINT \`FK_464daa05a35f3026f767d942703\` FOREIGN KEY (\`targetTimesheetId\`) REFERENCES \`timesheets\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
