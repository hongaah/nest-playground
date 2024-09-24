import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTagColumn1727179031375 implements MigrationInterface {
    name = 'AddTagColumn1727179031375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`tags\` varchar(30) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`tags\``);
    }

}
