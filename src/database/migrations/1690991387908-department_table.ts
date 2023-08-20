import {
  ENUM_COLUMN_TYPES,
  ENUM_TABLE_NAMES,
  commonColumns,
  defaultDateTimeColumns,
} from 'src/shared/db.utils';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class DepartmentTable1690991387908 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.createTable(
      new Table({
        name: ENUM_TABLE_NAMES.DEPARTMENTS,
        columns: [
          {
            name: 'id',
            type: ENUM_COLUMN_TYPES.UUID,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          ...commonColumns,
          ...defaultDateTimeColumns,
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(ENUM_TABLE_NAMES.DEPARTMENTS);
  }
}
