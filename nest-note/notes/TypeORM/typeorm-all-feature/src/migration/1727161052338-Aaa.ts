import { MigrationInterface, QueryRunner } from 'typeorm';

export class Aaa1727161052338 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE grass (
        id int NOT NULL AUTO_INCREMENT,
        color varchar(255) NOT NULL,
        amount varchar(255) NOT NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
