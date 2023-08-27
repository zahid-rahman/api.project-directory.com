import {
  ENUM_COLUMN_TYPES,
  ENUM_TABLE_NAMES,
  commonColumns,
  defaultDateTimeColumns,
} from 'src/shared/db.utils';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Employee1692507763782 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: ENUM_TABLE_NAMES.EMPLOYEES,
        columns: [
          {
            name: 'id',
            type: ENUM_COLUMN_TYPES.UUID,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'officeIdNumber',
            type: ENUM_COLUMN_TYPES.VARCHAR,
            length: '256',
            isNullable: true,
          },
          {
            name: 'departmentId',
            type: ENUM_COLUMN_TYPES.UUID,
            isNullable: false,
          },
          ...commonColumns,
          ...defaultDateTimeColumns,
        ],
      }),
    );

    await queryRunner.createForeignKey(
      ENUM_TABLE_NAMES.EMPLOYEES,
      new TableForeignKey({
        columnNames: ['departmentId'],
        referencedColumnNames: ['id'],
        referencedTableName: ENUM_TABLE_NAMES.DEPARTMENTS,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const employeeTable = await queryRunner.getTable(
      ENUM_TABLE_NAMES.EMPLOYEES,
    );
    await queryRunner.dropForeignKey(
      ENUM_TABLE_NAMES.EMPLOYEES,
      employeeTable.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('departmentId') !== -1,
      ),
    );
    await queryRunner.dropTable(ENUM_TABLE_NAMES.EMPLOYEES);
  }
}
