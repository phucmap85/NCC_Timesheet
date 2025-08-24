import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreationTimeToUserEntity1756051640070 implements MigrationInterface {
    name = 'AddCreationTimeToUserEntity1756051640070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`creationTime\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`creationTime\``);
    }

}
