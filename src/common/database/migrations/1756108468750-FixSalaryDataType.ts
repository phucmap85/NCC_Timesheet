import { MigrationInterface, QueryRunner } from "typeorm";

export class FixSalaryDataType1756108468750 implements MigrationInterface {
    name = 'FixSalaryDataType1756108468750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`salary\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`salary\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`salary\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`salary\` decimal NULL`);
    }

}
