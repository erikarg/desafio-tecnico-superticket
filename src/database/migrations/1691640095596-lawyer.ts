import { MigrationInterface, QueryRunner } from 'typeorm';

export class Lawyer1691640095596 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS lawyers (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        telephone TEXT NOT NULL,
        email TEXT NOT NULL,
        cpf TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS lawyers`);
  }
}
