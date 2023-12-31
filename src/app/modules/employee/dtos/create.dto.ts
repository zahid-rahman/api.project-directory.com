import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ENUM_COLUMN_TYPES } from 'src/shared/db.utils';

export class CreateEmployeeDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsOptional()
  departmentId: ENUM_COLUMN_TYPES.UUID;
}
