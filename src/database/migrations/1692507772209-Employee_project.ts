import {
  ENUM_COLUMN_TYPES,
  ENUM_TABLE_NAMES,
  defaultDateTimeColumns,
} from 'src/shared/db.utils';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class EmployeeProject1692507772209 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: ENUM_TABLE_NAMES.EMPLOYEE_PROJECTS,
        columns: [
          {
            name: 'id',
            type: ENUM_COLUMN_TYPES.UUID,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'employeeId',
            type: ENUM_COLUMN_TYPES.UUID,
            isNullable: false,
          },
          {
            name: 'projectId',
            type: ENUM_COLUMN_TYPES.UUID,
            isNullable: false,
          },
          ...defaultDateTimeColumns,
        ],
      }),
    );

    await queryRunner.createForeignKey(
      ENUM_TABLE_NAMES.EMPLOYEE_PROJECTS,
      new TableForeignKey({
        columnNames: ['employeeId'],
        referencedColumnNames: ['id'],
        referencedTableName: ENUM_TABLE_NAMES.EMPLOYEES,
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      ENUM_TABLE_NAMES.EMPLOYEE_PROJECTS,
      new TableForeignKey({
        columnNames: ['projectId'],
        referencedColumnNames: ['id'],
        referencedTableName: ENUM_TABLE_NAMES.PROJECTS,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const employeeProjectTable = await queryRunner.getTable(
      ENUM_TABLE_NAMES.EMPLOYEE_PROJECTS,
    );
    await queryRunner.dropForeignKey(
      ENUM_TABLE_NAMES.EMPLOYEE_PROJECTS,
      employeeProjectTable.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('employeeId') !== -1,
      ),
    );

    await queryRunner.dropForeignKey(
      ENUM_TABLE_NAMES.EMPLOYEE_PROJECTS,
      employeeProjectTable.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('projectId') !== -1,
      ),
    );
    await queryRunner.dropTable(ENUM_TABLE_NAMES.EMPLOYEE_PROJECTS);
  }
}
