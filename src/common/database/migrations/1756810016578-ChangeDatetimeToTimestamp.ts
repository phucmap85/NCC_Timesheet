import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeDatetimeToTimestamp1756810016578 implements MigrationInterface {
    name = 'ChangeDatetimeToTimestamp1756810016578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timesheets\` DROP COLUMN \`dateAt\``);
        await queryRunner.query(`ALTER TABLE \`timesheets\` ADD \`dateAt\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`projects\` DROP COLUMN \`timeStart\``);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD \`timeStart\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`projects\` DROP COLUMN \`timeEnd\``);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD \`timeEnd\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`salaryAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`salaryAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`startDateAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`startDateAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`endDateAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`endDateAt\` timestamp NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`endDateAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`endDateAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`startDateAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`startDateAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`salaryAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`salaryAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`projects\` DROP COLUMN \`timeEnd\``);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD \`timeEnd\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`projects\` DROP COLUMN \`timeStart\``);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD \`timeStart\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`timesheets\` DROP COLUMN \`dateAt\``);
        await queryRunner.query(`ALTER TABLE \`timesheets\` ADD \`dateAt\` datetime(6) NOT NULL`);
    }

}
