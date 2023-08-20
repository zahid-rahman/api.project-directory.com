import { ENUM_COLUMN_TYPES, ENUM_TABLE_NAMES } from 'src/shared/db.utils';
import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddTeamleaderForeignKey1692534374548
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      ENUM_TABLE_NAMES.PROJECTS,
      new TableColumn({
        name: 'teamleaderId',
        type: ENUM_COLUMN_TYPES.UUID,
        isNullable: false,
      }),
    );
    await queryRunner.createForeignKey(
      ENUM_TABLE_NAMES.PROJECTS,
      new TableForeignKey({
        columnNames: ['teamleaderId'],
        referencedColumnNames: ['id'],
        referencedTableName: ENUM_TABLE_NAMES.TEAMLEADERS,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const projectTable = await queryRunner.getTable(ENUM_TABLE_NAMES.PROJECTS);
    await queryRunner.dropForeignKey(
      ENUM_TABLE_NAMES.PROJECTS,
      projectTable.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('teamleaderId') !== -1,
      ),
    );
    await queryRunner.dropColumn(ENUM_TABLE_NAMES.PROJECTS, 'teamleaderId');
  }
}
