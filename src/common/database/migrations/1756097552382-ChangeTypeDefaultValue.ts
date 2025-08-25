import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTypeDefaultValue1756097552382 implements MigrationInterface {
    name = 'ChangeTypeDefaultValue1756097552382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`type\` \`type\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`type\` \`type\` int NOT NULL DEFAULT '0'`);
    }

}
