import { MigrationInterface, QueryRunner } from "typeorm";

export class Bbb1727165546113 implements MigrationInterface {
    name = 'Bbb1727165546113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`grass\` ADD \`name\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`grass\` DROP COLUMN \`name\``);
    }

}
