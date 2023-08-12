import { MigrationInterface, QueryRunner } from 'typeorm';

export class LawyerRelationship1691847271115 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE service_order
        ADD COLUMN lawyer_id int NULL,
        ADD CONSTRAINT fk_lawyer_id FOREIGN KEY (lawyer_id) REFERENCES company(id) ON DELETE CASCADE;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE service_order
        DROP CONSTRAINT fk_lawyer_id,
        DROP COLUMN lawyer_id;
        `);
  }
}
