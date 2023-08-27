import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ENUM_COLUMN_TYPES } from 'src/shared/db.utils';

class AssignEmployeeDTO {
  @IsString()
  officeId: string;
}

export class CreateProjectDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  teamleaderId: ENUM_COLUMN_TYPES.UUID;

  @IsOptional()
  employees: AssignEmployeeDTO[];
}
