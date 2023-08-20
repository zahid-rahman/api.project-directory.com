import { TableColumnOptions } from 'typeorm';

export enum ENUM_TABLE_NAMES {
  PROJECTS = 'projects',
  EMPLOYEES = 'employees',
  DEPARTMENTS = 'departments',
  EMPLOYEE_PROJECTS = 'employee_projects',
  TEAMLEADERS = 'teamleaders',
}

export enum ENUM_SEQUENCE {
  PRODUCT_CODE_SEQ = 'product_code_seq',
  ORDER_CODE_SEQ = 'order_code_seq',
}

export enum ENUM_COLUMN_TYPES {
  UUID = 'uuid',
  INT = 'int',
  FLOAT = 'float',
  TEXT = 'text',
  VARCHAR = 'varchar',
  BOOLEAN = 'boolean',
  TIMESTAMP_UTC = 'timestamp without time zone',
  ENUM = 'enum',
  JSONB = 'jsonb',
}

export const defaultDateTimeColumns: TableColumnOptions[] = [
  {
    name: 'createdAt',
    type: ENUM_COLUMN_TYPES.TIMESTAMP_UTC,
    default: 'NOW()',
    isNullable: true,
  },
  {
    name: 'updatedAt',
    type: ENUM_COLUMN_TYPES.TIMESTAMP_UTC,
    isNullable: true,
  },
  {
    name: 'deletedAt',
    type: ENUM_COLUMN_TYPES.TIMESTAMP_UTC,
    isNullable: true,
  },
];

export const commonColumns: TableColumnOptions[] = [
  {
    name: 'name',
    type: ENUM_COLUMN_TYPES.VARCHAR,
    length: '256',
    isNullable: true,
  },
];
