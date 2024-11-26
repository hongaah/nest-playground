import { MigrationInterface, QueryRunner } from "typeorm";

export class Aaa1727164797079 implements MigrationInterface {
    name = 'Aaa1727164797079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`grass\` (\`id\` int NOT NULL AUTO_INCREMENT, \`color\` varchar(255) NOT NULL, \`amount\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`grass\``);
    }

}
