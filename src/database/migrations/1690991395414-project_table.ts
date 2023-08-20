import {
  ENUM_COLUMN_TYPES,
  ENUM_TABLE_NAMES,
  commonColumns,
  defaultDateTimeColumns,
} from 'src/shared/db.utils';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ProjectTable1690991395414 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: ENUM_TABLE_NAMES.PROJECTS,
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
    await queryRunner.dropTable(ENUM_TABLE_NAMES.PROJECTS);
  }
}
