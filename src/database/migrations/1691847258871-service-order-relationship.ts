import { MigrationInterface, QueryRunner } from 'typeorm';

export class ServiceOrderRelationship1691847258871
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE service_order
          ADD COLUMN company_id int,
          ADD CONSTRAINT fk_company_id FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE service_order
          DROP CONSTRAINT fk_company_id,
          DROP COLUMN company_id;
        `);
  }
}
